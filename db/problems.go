package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
)

func (p *pgDb) createTableProblems() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS problems (
			problemid SERIAL UNIQUE, 
			hometaskid INTEGER REFERENCES hometasks(hometaskid) ON DELETE CASCADE,
			statement TEXT,
			maxscore INTEGER,
			num INTEGER,
			UNIQUE (hometaskid, num)
		);
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareProblemsSqlStatements() (err error) {

	if p.sqlSelectProblems, err = p.dbConn.Preparex(
		"SELECT problemid, hometaskid, statement, maxscore FROM problems",
	); err != nil {
		return err
	}

	if p.sqlInsertProblem, err = p.dbConn.Prepare(
		"INSERT INTO problems(hometaskid, statement, maxscore) VALUES($1, $2, $3);",
	); err != nil {
		return err
	}

	if p.sqlDeleteProblem, err = p.dbConn.Prepare(
		"DELETE FROM problems WHERE problemid = $1",
	); err != nil {
		return err
	}

	if p.sqlSelectProblemsFromHometask, err = p.dbConn.Preparex(
		"SELECT problemid, statement, maxscore FROM problems WHERE hometaskid=$1 ORDER BY num",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectProblems() ([]*model.Problem, error) {
	problems := make([]*model.Problem, 0)
	if err := p.sqlSelectProblems.Select(&problems); err != nil {
		return nil, err
	}
	return problems, nil
}

func (p *pgDb) InsertProblemDb(problem model.Problem) (error) {
	if _, err := p.sqlInsertProblem.Exec(problem.Hometaskid, problem.Statement, problem.Maxscore); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteProblemDb(id int) (error) {
	if _, err := p.sqlDeleteProblem.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectProblemsFromHometaskDb(hometaskid int) ([]*model.ProblemInfo, error) {
	problems := make([]*model.ProblemInfo, 0)
	err := p.sqlSelectProblemsFromHometask.Select(&problems, hometaskid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no problems in this hometask!")
		return nil, errors.New("There is no problems in this hometask!")
	case nil:
		return problems, nil
	default:
		panic(err)
	}
	return problems, nil
}