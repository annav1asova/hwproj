package model

type Person struct {
	Id          int64
	First, Last string
}

func NewPerson(first, last string) Person {
	return Person{0, first, last}
}