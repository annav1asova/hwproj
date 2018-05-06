package model

type db interface {
	SelectPeople() ([]*Person, error)
	Insert(Person) (int, error)
	Exists(EntryData) (int, error)
	SelectPerson(int) (UserInfo, error)
	UpdatePerson(Person) (error)
	AddAdmin()

	SelectTasks() ([]*Hometask, error)
	InsertHometask(task Hometask) (error)
	DeleteHometask(id int) (error)

	SelectProblems() ([]*Problem, error)
	InsertProblem(problem Problem) (error)
	DeleteProblem(id int) (error)
	SelectProblemsFromHometask(hometaskid int) ([]*Problem, error)
}
