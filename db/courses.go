package db

import (
	"hwproj/model"
	//"database/sql"
	//"fmt"
	//"golang.org/x/crypto/bcrypt"
	//"errors"
)

func (p *pgDb) createTableCourses() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS courses (
			courseid SERIAL UNIQUE,
			name TEXT NOT NULL,
			groupname TEXT,
			teacherid INTEGER
		);
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareCoursesSqlStatements() (err error) {

	if p.sqlSelectCourses, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, teacherid FROM courses",
	); err != nil {
		return err
	}

	if p.sqlInsertCourse, err = p.dbConn.Prepare(
		"INSERT INTO courses(name, groupname, teacherid) VALUES($1,$2,$3);",
	); err != nil {
		return err
	}

	if p.sqlDeleteCourse, err = p.dbConn.Prepare(
		"DELETE FROM courses WHERE courseid = $1",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectCourses() ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	if err := p.sqlSelectCourses.Select(&courses); err != nil {
		return nil, err
	}
	return courses, nil
}

func (p *pgDb) InsertCourse(course model.Course) (error) {
	if _, err := p.sqlInsertCourse.Exec(course.Name, course.Groupname, course.Teacherid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteCourse(id int) (error) {
	if _, err := p.sqlDeleteCourse.Exec(id); err != nil {
		return err
	}
	return nil
}
