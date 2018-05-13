package db

import (
	"hwproj/model"
	//"database/sql"
	//"fmt"
	//"golang.org/x/crypto/bcrypt"
	//"errors"
	"database/sql"
	"fmt"
	"errors"
)

func (p *pgDb) createTableCourses() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS courses (
			courseid SERIAL UNIQUE,
			name TEXT NOT NULL,
			groupname TEXT,
			teacherid INTEGER,
			active BOOLEAN
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

	if p.sqlSelectCoursesOfTeacher, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, teacherid, active FROM courses WHERE teacherid=$1",
	); err != nil {
		return err
	}

	if p.sqlSelectActiveCourses, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, teacherid, active FROM courses WHERE active = TRUE",
	); err != nil {
		return err
	}

	if p.sqlSelectNonActiveCourses, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, teacherid, active FROM courses WHERE active = FALSE",
	); err != nil {
		return err
	}

	if p.sqlSelectActiveCoursesWithName, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, firstname, surname " +
			"FROM courses JOIN users ON courses.teacherid = users.userid " +
			"WHERE active = TRUE",
	); err != nil {
		return err
	}

	if p.sqlSelectNonActiveCoursesWithName, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, firstname, surname " +
			"FROM courses JOIN users ON courses.teacherid = users.userid " +
			"WHERE active = FALSE",
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

func (p *pgDb) InsertCourseDb(course model.Course) (error) {
	if _, err := p.sqlInsertCourse.Exec(course.Name, course.Groupname, course.Teacherid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteCourseDb(id int) (error) {
	if _, err := p.sqlDeleteCourse.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectCoursesOfTeacherDb(teacherid int) ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	err := p.sqlSelectCoursesOfTeacher.Select(&courses, teacherid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no courses in this teacher!")
		return nil, errors.New("There is no courses in this teacher!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectActiveCoursesDb() ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	err := p.sqlSelectActiveCourses.Select(&courses)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no courses!")
		return nil, errors.New("No courses found!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectNonActiveCoursesDb() ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	err := p.sqlSelectNonActiveCourses.Select(&courses)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no courses!")
		return nil, errors.New("No courses found!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectActiveCoursesWithNameDb() ([]*model.CourseInfo, error) {
	courses := make([]*model.CourseInfo, 0)
	err := p.sqlSelectActiveCoursesWithName.Select(&courses)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no courses!")
		return nil, errors.New("No courses found!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectNonActiveCoursesWithNameDb() ([]*model.CourseInfo, error) {
	courses := make([]*model.CourseInfo, 0)
	err := p.sqlSelectNonActiveCoursesWithName.Select(&courses)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no courses!")
		return nil, errors.New("No courses found!")
	case nil:
		return courses, nil
	default:
		panic(err)
	}
}