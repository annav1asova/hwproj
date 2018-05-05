package db

import (
	"hwproj/model"
	"fmt"
	"errors"
	"database/sql"
)

func (p *pgDb) createTableSubmissions() error {
	create_sql := `

	  	CREATE TABLE IF NOT EXISTS submissions (
			submissionid SERIAL UNIQUE,
			boardcellid INTEGER REFERENCES board(boardcellid),
			pullrequest VARCHAR(500), 
			file BYTEA,
			timesended TIMESTAMP,
			comment VARCHAR(500),
			CHECK (pullrequest IS NOT NULL or file IS NOT NULL)
		);

    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareSubmissionSqlStatements() (err error) {

	if p.sqlSelectSubmissions, err = p.dbConn.Preparex(
		"SELECT submissionid, boardcellid, pullrequest, file, timesended, comment FROM submissions",
	); err != nil {
		return err
	}

	if p.sqlInsertSubmission, err = p.dbConn.Prepare(
		"INSERT INTO submissions(boardcellid, pullrequest, file, timesended, comment) VALUES($1, $2, $3, $4, $5);",
	); err != nil {
		return err
	}

	if p.sqlDeleteSubmission, err = p.dbConn.Prepare(
		"DELETE FROM submissions WHERE submissionid = $1",
	); err != nil {
		return err
	}

	if p.sqlGetPullRequestOrFile, err = p.dbConn.Preparex(
		"SELECT pullrequest, file FROM submissions WHERE submissionid = $1",
	); err != nil {
		return err
	}

	if p.sqlGetSubmissionsFromCell, err = p.dbConn.Preparex(
		"SELECT submissionid, boardcellid, pullrequest, file, timesended, comment FROM submissions WHERE boardcellid = $1",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectSubmissions() ([]*model.Submission, error) {
	submissions := make([]*model.Submission, 0)
	if err := p.sqlSelectSubmissions.Select(&submissions); err != nil {
		return nil, err
	}
	return submissions, nil
}

func (p *pgDb) InsertSubmission(Submission model.Submission) (error) {
	if _, err := p.sqlInsertSubmission.Exec(Submission.Boardcellid,
			Submission.Pullrequest, Submission.File,
			Submission.Timesended, Submission.Comment); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteSubmission(id int) (error) {
	if _, err := p.sqlDeleteSubmission.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) GetSubmissionsFromCell(boardcellid int) ([]*model.Submission, error) {
	submissions := make([]*model.Submission, 0)
	err := p.sqlGetSubmissionsFromCell.Select(&submissions, boardcellid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There isn't any submissions in this cell!")
		return nil, errors.New("There isn't any submissions in this cell!")
	case nil:
		return submissions, nil
	default:
		panic(err)
	}
}
