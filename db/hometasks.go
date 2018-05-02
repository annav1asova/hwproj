package db

import (
	"hwproj/model"
	//"database/sql"
	//"fmt"
	//"golang.org/x/crypto/bcrypt"
	//"errors"
)

func (p *pgDb) createTableHometasks() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS hometasks (
			hometaskid SERIAL UNIQUE,
			taskname TEXT NOT NULL,
			deadline TIMESTAMP,
			isTest boolean
		);
	
    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareHometasksSqlStatements() (err error) {

	if p.sqlSelectHometasks, err = p.dbConn.Preparex(
		"SELECT hometaskid, taskname, deadline, isTest FROM hometasks",
	); err != nil {
		return err
	}

	if p.sqlInsertHometask, err = p.dbConn.Prepare(
		"INSERT INTO hometasks(taskname, deadline, isTest) VALUES($1,'2018-05-31 10:23:54', $2);",
	); err != nil {
		return err
	}

	if p.sqlDeleteHometask, err = p.dbConn.Prepare(
		"DELETE FROM hometasks WHERE hometaskid = $1",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectTasks() ([]*model.Hometask, error) {
	hometasks := make([]*model.Hometask, 0)
	if err := p.sqlSelectHometasks.Select(&hometasks); err != nil {
		return nil, err
	}
	return hometasks, nil
}

func (p *pgDb) InsertHometask(task model.Hometask) (error) {
	if _, err := p.sqlInsertHometask.Exec(task.Taskname, task.IsTest); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteHometask(id int) (error) {
	if _, err := p.sqlDeleteHometask.Exec(id); err != nil {
		return err
	}
	return nil
}
