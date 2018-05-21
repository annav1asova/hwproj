package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"errors"
)

func (p *pgDb) createTableLinks() error {
	create_sql := `

		CREATE TABLE IF NOT EXISTS links (
			linkid SERIAL UNIQUE, 
			hometaskid INTEGER REFERENCES hometasks(hometaskid) ON DELETE CASCADE,
			url TEXT,
			linkname TEXT,
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

func (p *pgDb) prepareLinksSqlStatements() (err error) {

	if p.sqlSelectLinks, err = p.dbConn.Preparex(
		"SELECT linkid, hometaskid, url, linkname, num FROM links",
	); err != nil {
		return err
	}

	if p.sqlInsertLink, err = p.dbConn.Prepare(
		"INSERT INTO links(hometaskid, url, linkname, num) VALUES($1, $2, $3, $4);",
	); err != nil {
		return err
	}

	if p.sqlDeleteLink, err = p.dbConn.Prepare(
		"DELETE FROM links WHERE linkid = $1",
	); err != nil {
		return err
	}

	if p.sqlSelectLinksFromHometask, err = p.dbConn.Preparex(
		"SELECT linkid, url, linkname FROM links WHERE hometaskid=$1 ORDER BY num",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectLinks() ([]*model.Link, error) {
	links := make([]*model.Link, 0)
	if err := p.sqlSelectLinks.Select(&links); err != nil {
		return nil, err
	}
	return links, nil
}

func (p *pgDb) InsertLinkDb(link model.Link) (error) {
	if _, err := p.sqlInsertLink.Exec(link.Hometaskid, link.Url, link.Linkname, link.Num); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) DeleteLinkDb(id int) (error) {
	if _, err := p.sqlDeleteLink.Exec(id); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) SelectLinksFromHometaskDb(hometaskid int) ([]*model.LinkInfo, error) {
	links := make([]*model.LinkInfo, 0)
	err := p.sqlSelectLinksFromHometask.Select(&links, hometaskid)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("There is no links in this hometask!")
		return nil, errors.New("There is no links in this hometask!")
	case nil:
		return links, nil
	default:
		panic(err)
	}
	return links, nil
}