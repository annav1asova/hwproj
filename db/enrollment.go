package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
)

func (p *pgDb) createTableEnrollment() error {
	create_sql := `

       CREATE TABLE IF NOT EXISTS enrollment ( -- заявки
	   		enrollmentid SERIAL UNIQUE,
			termid INTEGER REFERENCES terms(termid) ON DELETE CASCADE,
			userid INTEGER REFERENCES users(userid) ON DELETE CASCADE, 
			state TEXT DEFAULT 'waiting',
			CHECK (state in ('approved', 'rejected', 'waiting')), 
			UNIQUE (userid, termid)
		);

    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareEnrollmentSqlStatements() (err error) {

	if p.sqlSelectEnrollment, err = p.dbConn.Preparex(
		"SELECT enrollmentid, termid, userid, state FROM enrollment",
	); err != nil {
		return err
	}

	if p.sqlInsertEnrollment, err = p.dbConn.Prepare(
		"INSERT INTO enrollment(termid, userid) VALUES($1,$2);",
	); err != nil {
		return err
	}

	if p.sqlUpdateEnrollment, err = p.dbConn.Prepare(
		"UPDATE enrollment SET state = $1 WHERE enrollmentid = $2",
	); err != nil {
		return err
	}

	if p.sqlSelectEnrollmentsToTerm, err = p.dbConn.Preparex(
		"SELECT enrollmentid, termid, userid, state FROM enrollment WHERE termid=$1",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectEnrollment() ([]*model.Enrollment, error) {
	enrollments := make([]*model.Enrollment, 0)
	if err := p.sqlSelectEnrollment.Select(&enrollments); err != nil {
		return nil, err
	}
	return enrollments, nil
}

func (p *pgDb) InsertEnrollment(enrollment model.Enrollment) (error) {
	if _, err := p.sqlInsertEnrollment.Exec(enrollment.Termid, enrollment.Userid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) UpdateEnrollment(enrollment model.Enrollment) (error) {
	if _, err := p.sqlUpdateEnrollment.Exec(enrollment.State, enrollment.Enrollmentid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectEnrollmentsFromTerm(termid int) ([]*model.Enrollment, error) {
	enrollments := make([]*model.Enrollment, 0)
	err := p.sqlSelectEnrollmentsToTerm.Select(&enrollments, termid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no enrollments in this term!")
		return nil, errors.New("There is no enrollments in this term!")
	case nil:
		return enrollments, nil
	default:
		panic(err)
	}
}