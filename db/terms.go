package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
)

func (p *pgDb) createTableTerms() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS terms (
			termid SERIAL UNIQUE, 
			courseid INTEGER REFERENCES courses(courseid),
			termname TEXT,
			num INTEGER
		);
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareTermsSqlStatements() (err error) {

	if p.sqlSelectTerms, err = p.dbConn.Preparex(
		"SELECT termid, courseid, termname, num FROM terms",
	); err != nil {
		return err
	}

	if p.sqlInsertTerm, err = p.dbConn.Prepare(
		"INSERT INTO terms(courseid, termname, num) VALUES($1, $2, $3);",
	); err != nil {
		return err
	}

	if p.sqlDeleteTerm, err = p.dbConn.Prepare(
		"DELETE FROM terms WHERE termid = $1",
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

func (p *pgDb) SelectTerms() ([]*model.Term, error) {
	terms := make([]*model.Term, 0)
	if err := p.sqlSelectTerms.Select(&terms); err != nil {
		return nil, err
	}
	return terms, nil
}

func (p *pgDb) InsertTerm(term model.Term) (error) {
	if _, err := p.sqlInsertTerm.Exec(term.Courseid, term.Termname, term.Num); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteTerm(id int) (error) {
	if _, err := p.sqlDeleteTerm.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectTermsFromCourse(courseid int) ([]*model.Term, error) {
	terms := make([]*model.Term, 0)
	err := p.sqlSelectTermsFromCourse.Select(&terms, courseid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no terms in this course!")
		return nil, errors.New("There is no terms in this course!")
	case nil:
		return terms, nil
	default:
		panic(err)
	}
}