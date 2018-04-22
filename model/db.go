package model

type db interface {
	SelectPeople() ([]*Person, error)
	Insert(Person) (int, error)
	Exists(EntryData) (int, error)
	SelectPerson(int) (UserInfo, error)
}
