package db

import (
	"hwproj/model"
	"database/sql"
	"errors"
)

func (p *pgDb) createTableTaskConnection() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS taskconnection (
			termid INTEGER REFERENCES terms(termid) ON DELETE CASCADE,
			hometaskid INTEGER REFERENCES hometasks(hometaskid) ON DELETE CASCADE,
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

func (p *pgDb) prepareTaskConnectionSqlStatements() (err error) {
	if p.sqlInsertTaskConnection, err = p.dbConn.Prepare(
		"INSERT INTO taskconnection(termid, hometaskid, num) VALUES($1, $2, $3);",
	); err != nil {
		return err
	}

	if p.sqlDeleteTaskConnection, err = p.dbConn.Prepare(
		"DELETE FROM taskconnection WHERE termid = $1 AND hometaskid = $2",
	); err != nil {
		return err
	}

	if p.sqlSelectTasksInTerm, err = p.dbConn.Preparex(
		"SELECT hometasks.hometaskid, hometasks.taskname, hometasks.deadline, hometasks.isTest " +
			"FROM taskconnection JOIN hometasks ON taskconnection.hometaskid = hometasks.hometaskid " +
			"WHERE taskconnection.termid = $1 ORDER BY taskconnection.num",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) InsertTaskConnectionDb(conn model.ConnectionTermTask) (error) {
	if _, err := p.sqlInsertTaskConnection.Exec(conn.Termid, conn.Hometaskid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteTaskConnectionDb(conn model.ConnectionTermTask) (error) {
	if _, err := p.sqlDeleteTaskConnection.Exec(conn.Termid, conn.Hometaskid); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectTasksInTermDb(termid int) ([]*model.Hometask, error) {
	tasks := make([]*model.Hometask, 0)
	err := p.sqlSelectTasksInTerm.Select(&tasks, termid)
	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("There is no courses followed by this student!")
	case nil:
		return tasks, nil
	default:
		panic(err)
	}
}