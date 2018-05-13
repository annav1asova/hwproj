package model

import (
	"golang.org/x/crypto/bcrypt"
	"log"
	"time"
	"os"
	_"encoding/xml"
)


type Person struct {
	Userid                      int
	Firstname, Surname, Email   string
	Password 					string
}

func NewPerson(id int, first, last, email, password string) Person {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password", err)
	}
	return Person{id, first, last, email, string(hash)}
}

type EntryData struct {
	Email, Pass string
}

type UserInfo struct {
	FirstName, Surname, Email, Type string
}

type Hometask struct {
	Hometaskid 	int
	Taskname 	string
	Deadline 	time.Time
	IsTest 		bool
}

type Problem struct {
	Problemid 	int
	Hometaskid 	int
	Statement 	string
	Maxscore	int
}

type Link struct {
	Linkid 		int
	Hometaskid 	int
	Url	 		string
	Linkname	string
}

type Cell struct {
	Boardcellid int
	Userid 		int
	Problemid 	int
	Score 		int
}

type Submission struct {
	Submissionid int
	Boardcellid int
	Pullrequest string
	File os.File
	Timesended time.Time
	Comment string
}

type Course struct {
	Courseid 	int
	Name 		string
	Groupname 	string
	Teacherid 	int
	Active 		bool
}

type CourseInfo struct {
	Courseid 			int
	Name 				string
	Groupname 			string
	TeacherFirstName 	string
	TeacherLastName 	string
}

type Term struct {
	Termid 		int
	Courseid 	int
	Termname 	string
	Num 		int
}

type Enrollment struct {
	Enrollmentid int
	Termid int
	Userid int
	State string
}