package db

import (
	"hwproj/model"
	"database/sql"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"errors"
)

func (p *pgDb) createTableUsers() error {
	create_sql := `

       CREATE TABLE IF NOT EXISTS users (
        userid SERIAL UNIQUE,
        firstname TEXT NOT NULL CHECK (firstname SIMILAR TO '[(A-Za-zА-Яа-яё\-)]{2,}'),
        surname TEXT NOT NULL CHECK (surname SIMILAR TO '[(A-Za-zА-Яа-яё\-)]{2,}'),
        email TEXT NOT NULL CHECK (email LIKE '%@%') UNIQUE,
        password TEXT NOT NULL,
        type TEXT CHECK (type in ('student', 'teacher', 'admin')));

    `
	if rows, err := p.dbConn.Query(create_sql); err != nil {
		return err
	} else {
		rows.Close()
	}
	return nil
}

func (p *pgDb) prepareUsersSqlStatements() (err error) {

	if p.sqlSelectPeople, err = p.dbConn.Preparex(
		"SELECT userid, firstname, surname, email, password FROM users",
	); err != nil {
		return err
	}

	if p.sqlInsertPerson, err = p.dbConn.Prepare(
		"INSERT INTO users(firstname, surname, email, password, type) VALUES($1,$2,$3,$4, 'student');",
	); err != nil {
		return err
	}

	if p.sqlSelectPerson, err = p.dbConn.Prepare(
		"SELECT firstname, surname, email, type FROM users WHERE userid = $1",
	); err != nil {
		return err
	}

	if p.sqlExistsPerson, err = p.dbConn.Prepare(
		"SELECT userid, password FROM users WHERE email = $1",
	); err != nil {
		return err
	}

	if p.sqlUpdatePerson, err = p.dbConn.Prepare(
		"UPDATE users SET firstname = $1, surname = $2, email = $3, password = $4 WHERE userid = $5",
	); err != nil {
		return err
	}

	return nil
}

func (p *pgDb) SelectPeople() ([]*model.Person, error) {
	users := make([]*model.Person, 0)
	if err := p.sqlSelectPeople.Select(&users); err != nil {
		return nil, err
	}
	return users, nil
}

func (p *pgDb) Insert(person model.Person) (int, error) {
	if _, err := p.sqlInsertPerson.Exec(person.Firstname, person.Surname, person.Email, person.Password); err != nil {
		return -1, err
	}
	row := p.sqlExistsPerson.QueryRow(person.Email)
	var lastInsertedId int
	var some string
	row.Scan(&lastInsertedId, &some)
	return lastInsertedId, nil
}

func (p *pgDb) Exists(data model.EntryData) (int, error) {
	row := p.sqlExistsPerson.QueryRow(data.Email)
	var id int
	var hashFromDB string
	switch err := row.Scan(&id, &hashFromDB); err {
	case sql.ErrNoRows:
		fmt.Println("There is no users with this email!")
		return -1, errors.New("There is no users with this email!")
	case nil:
		if errInPass := bcrypt.CompareHashAndPassword([]byte(hashFromDB), []byte(data.Pass)); errInPass != nil {
			fmt.Println("Wrong password!")
			return -2, errors.New("Wrong password!")
		}
		fmt.Println(id, "Password was correct")
	default:
		panic(err)
	}
	return id, nil
}

func (p *pgDb) SelectPerson(id int) (model.UserInfo, error) {
	row := p.sqlSelectPerson.QueryRow(id)
	var user model.UserInfo
	switch err := row.Scan(&user.FirstName, &user.Surname, &user.Email, &user.Type); err {
	case sql.ErrNoRows:
		fmt.Println("There is no users with this uid!")
	case nil:
		return user, nil
	}
	return model.UserInfo{}, nil
}

func (p *pgDb) UpdatePerson(person model.Person) (error) {
	if _, err := p.sqlUpdatePerson.Exec(person.Firstname, person.Surname, person.Email, person.Password, person.Userid); err != nil {
		return err
	}
	return nil
}
