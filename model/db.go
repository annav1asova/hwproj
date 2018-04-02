package model

type db interface {
	SelectPeople() ([]*Person, error)
	Insert(Person) (error)
}
