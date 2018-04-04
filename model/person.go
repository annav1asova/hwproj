package model

import (
	_"log"
	//_"golang.org/x/crypto/bcrypt"
)


type Person struct {
	Userid          int64
	Firstname, Surname, Email, Password string
}

func NewPerson(first, last, email, password string) Person {
	//hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	//if err != nil {
	//	log.Printf("Error hashing password", err)
	//}
	return Person{0, first, last, email, password}
}

type EntryData struct {
	Email, HashedPass string
}