package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
	_"log"
)

func (p *pgDb) createTableBoard() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS board (
			boardcellid SERIAL UNIQUE,
			userid INTEGER REFERENCES users(userid),
			problemid INTEGER REFERENCES problems(problemid),
			score INTEGER DEFAULT 0, --меньше maxscore должно быть по идее
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
