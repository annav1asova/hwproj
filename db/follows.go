package db

import (
	"hwproj/model"
	"database/sql"
	"errors"
)

func (p *pgDb) createTableFollows() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS follows (
			termid INTEGER REFERENCES terms(termid),
			userid INTEGER REFERENCES users(userid)
		);
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
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
		"SELECT courses.courseid, courses.name, courses.groupname, courses.teacherid, courses.active FROM follows " +
			"JOIN terms ON follows.termid = terms.termid " +
				"JOIN courses ON terms.courseid = courses.courseid " +
					"WHERE follows.userid = $1 AND courses.active = TRUE",
	); err != nil {
		return err
	}

	if p.sqlSelectTermsFromCourse, err = p.dbConn.Preparex(
		"SELECT termid, courseid, termname, num FROM terms WHERE courseid=$1",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) InsertConnectionDb(conn model.Connection) (error) {
	if _, err := p.sqlInsertConnection.Exec(conn.Termid, conn.Userid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteConnectionDb(conn model.Connection) (error) {
	if _, err := p.sqlDeleteConnection.Exec(conn.Termid, conn.Userid); err != nil {
		return err
	}
	return nil
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