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
		"INSERT INTO courses(name, groupname, teacherid, active) VALUES($1,$2,$3,$4);",
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

	if p.sqlSelectActiveCoursesOfTeacher, err = p.dbConn.Preparex(
		"SELECT courseid, name, groupname, teacherid, active FROM courses WHERE active = TRUE AND teacherid = $1",
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

	//if p.sqlSelectCourse, err = p.dbConn.Preparex(
	//	"SELECT courses.name, COUNT(*) FROM courses JOIN terms ON courses.courseid = terms.courseid WHERE courses.courseid = 5 GROUP BY courses.name) UNION ALL (SELECT courses.name, 0 FROM courses LEFT JOIN terms ON courses.courseid = terms.courseid WHERE (courses.courseid = 5 AND terms.courseid IS NULL)GROUP BY courses.name)",
	//); err != nil {
	//	return err
	//}

	if p.sqlSelectCourseName, err = p.dbConn.Preparex(
		"SELECT name FROM courses WHERE courseid = $1",
	); err != nil {
		return err
	}

	if p.sqlSelectTermsNumber, err = p.dbConn.Preparex(
		"SELECT COUNT(*) FROM courses JOIN terms ON courses.courseid = terms.courseid " +
			"WHERE courses.courseid = $1 GROUP BY courses.courseid",
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
	if _, err := p.sqlInsertCourse.Exec(course.Name, course.Groupname, course.Teacherid, course.Active); err != nil {
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

func (p *pgDb) SelectActiveCoursesOfTeacherDb(teacherid int) ([]*model.Course, error) {
	courses := make([]*model.Course, 0)
	err := p.sqlSelectActiveCoursesOfTeacher.Select(&courses, teacherid)
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

//func (p *pgDb) SelectCourseDb(courseid int) (*model.CourseSm, error) {
//	var course *model.CourseSm
//	err := p.sqlSelectNonActiveCoursesWithName.Select(&course, courseid)
//	switch err {
//	case sql.ErrNoRows:
//		return nil, errors.New("No courses found!")
//	case nil:
//		return course, nil
//	default:
//		panic(err)
//	}
//}

func (p *pgDb) SelectCourseNameDb(courseid int) (string, error) {
	var courseName string
	err := p.sqlSelectNonActiveCoursesWithName.Select(&courseName, courseid)
	switch err {
	case sql.ErrNoRows:
		return "", errors.New("No courses found!")
	case nil:
		return courseName, nil
	default:
		panic(err)
	}
}

func (p *pgDb) SelectTermsNumberDb(courseid int) (int, error) {
	var courseNumber int
	err := p.sqlSelectNonActiveCoursesWithName.Select(&courseNumber, courseid)
	switch err {
	case sql.ErrNoRows:
		return 0, nil
	case nil:
		return courseNumber, nil
	default:
		panic(err)
	}
}