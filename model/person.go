package model

import (
	_"log"
	_"golang.org/x/crypto/bcrypt"
	"golang.org/x/crypto/bcrypt"
	"log"
)


type Person struct {
	Userid          int64
	Firstname, Surname, Email string
	Password string
}

func NewPerson(first, last, email, password string) Person {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password", err)
	}
	return Person{0, first, last, email, string(hash)}
}

type EntryData struct {
	Email, Pass string
}