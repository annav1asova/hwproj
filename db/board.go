package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
	"log"
)

func (p *pgDb) createTableBoard() error {
	create_sql := `
		CREATE TABLE IF NOT EXISTS board (
			boardcellid SERIAL UNIQUE,
			userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
			problemid INTEGER REFERENCES problems(problemid) ON DELETE CASCADE, 
			score INTEGER DEFAULT 0, 
			UNIQUE (userid, problemid)
		);

    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareBoardSqlStatements() (err error) {

	if p.sqlSelectCells, err = p.dbConn.Preparex(
		"SELECT boardcellid, userid, problemid, score FROM board",
	); err != nil {
		return err
	}

	if p.sqlInsertCell, err = p.dbConn.Prepare(
		"INSERT INTO board(userid, problemid, score) VALUES($1, $2, $3);",
	); err != nil {
		return err
	}

	if p.sqlDeleteCell, err = p.dbConn.Prepare(
		"DELETE FROM board WHERE boardcellid = $1",
	); err != nil {
		return err
	}

	if p.sqlGetScore, err = p.dbConn.Preparex(
		"SELECT score FROM board WHERE userid = $1 AND problemid = $2",
	); err != nil {
		return err
	}

	if p.sqlGetScoresOfUserInTerm, err = p.dbConn.Preparex(
		"SELECT score FROM board JOIN problems ON board.problemid = problems.problemid " +
			"JOIN hometasks ON hometasks.hometaskid = problems.hometaskid " +
				"JOIN taskconnection ON taskconnection.hometaskid = hometasks.hometaskid " +
					"WHERE board.userid = $1 AND taskconnection.termid = $2" +
						"ORDER BY taskconnection.num, problems.num;",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectCells() ([]*model.Cell, error) {
	cells := make([]*model.Cell, 0)
	if err := p.sqlSelectCells.Select(&cells); err != nil {
		return nil, err
	}
	return cells, nil
}

func (p *pgDb) InsertCell(Cell model.Cell) (error) {
	if _, err := p.sqlInsertCell.Exec(Cell.Userid, Cell.Problemid, Cell.Score); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteCell(id int) (error) {
	if _, err := p.sqlDeleteCell.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) GetScore(userid int, problemid int) (int, error) {
	var cell model.Cell
	err := p.sqlGetScore.Select(&cell, userid, problemid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There isn't any problems with given id for this user!")
		return -1, errors.New("There isn't any problems with given id for this user!")
	case nil:
		return cell.Score, nil
	default:
		panic(err)
	}
}

func (p *pgDb) GetScoresOfUserInTermDb(userid int, termid int) ([]int, error) {
	scores := make([]int, 0)
	err := p.sqlGetScoresOfUserInTerm.Select(&scores, userid, termid)
	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("There is no scores followed by this student!")
	case nil:
		log.Print(scores)
		return scores, nil
	default:
		panic(err)
	}
}
