package db

import (
	"hwproj/model"
	"database/sql"
	"errors"
)

func (p *pgDb) createTableFollows() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS follows (
			termid INTEGER REFERENCES terms(termid) ON DELETE CASCADE,
			userid INTEGER REFERENCES users(userid) ON DELETE CASCADE
		);
	
    `
    create_trigger := `

		CREATE OR REPLACE FUNCTION add_to_board_row() RETURNS trigger AS $$
		BEGIN	
			INSERT INTO board(userid, problemid, score)
				(SELECT NEW.userid, problems.problemid, 0 FROM taskconnection 
				JOIN problems ON taskconnection.hometaskid = problems.hometaskid
				WHERE taskconnection.termid = NEW.termid);
			RETURN NEW;
			END;
		$$language plpgsql;

		DROP TRIGGER IF EXISTS add_to_board_row ON follows;
		CREATE TRIGGER add_to_board_row AFTER INSERT ON follows
    		FOR EACH ROW EXECUTE PROCEDURE add_to_board_row();  
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else if _, err := p.dbConn.Query(create_trigger); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareFollowsSqlStatements() (err error) {
	if p.sqlInsertConnection, err = p.dbConn.Prepare(
		"INSERT INTO follows(termid, userid) VALUES($1, $2);",
	); err != nil {
		return err
	}

	if p.sqlDeleteConnection, err = p.dbConn.Prepare(
		"DELETE FROM follows WHERE termid = $1 AND userid = $2",
	); err != nil {
		return err
	}

	if p.sqlSelectCoursesOfStudent, err = p.dbConn.Preparex(
		"SELECT DISTINCT courses.courseid, courses.name, courses.groupname, courses.teacherid, courses.active FROM follows " +
			"JOIN terms ON follows.termid = terms.termid " +
				"JOIN courses ON terms.courseid = courses.courseid " +
					"WHERE follows.userid = $1 AND courses.active = TRUE",
	); err != nil {
		return err
	}

	if p.sqlSelectStudentsFromTerm, err = p.dbConn.Preparex(
		"SELECT users.firstname, users.surname, users.userid FROM follows " +
			"JOIN users ON follows.userid = users.userid WHERE follows.termid = $1",
	); err != nil {
		return err
	}

	if p.sqlExistsConnection, err = p.dbConn.Preparex(
		"SELECT termid, userid FROM follows WHERE termid=$1 AND userid=$2",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) InsertConnectionDb(conn model.ConnectionTermUser) (error) {
	if _, err := p.sqlInsertConnection.Exec(conn.Termid, conn.Userid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteConnectionDb(conn model.ConnectionTermUser) (error) {
	if _, err := p.sqlDeleteConnection.Exec(conn.Termid, conn.Userid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) ExistsConnectionDb(conn model.ConnectionTermUser) (bool) {
	conns := make([]*model.ConnectionTermUser, 0)
	err := p.sqlSelectTermsFromCourse.Select(&conns, conn.Termid, conn.Userid)
	switch err {
	case sql.ErrNoRows:
		return false
	case nil:
		return true
	default:
		panic(err)
	}
}

func (p *pgDb) SelectCoursesOfStudentDb(studentid int) ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	err := p.sqlSelectCoursesOfStudent.Select(&courses, studentid)
	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("There is no courses followed by this student!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectStudentsFromTermDb(termid int) ([]*model.UserName, error) {
	users := make([]*model.UserName, 0)
	err := p.sqlSelectStudentsFromTerm.Select(&users, termid)
	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("There is no students who follows this term!")
	case nil:
		return users, nil
	default:
		panic(err)
	}
}