package model

type Model struct {
	db
}

func New(db db) *Model {
	return &Model{
		db: db,
	}
}

func (m *Model) People() ([]*Person, error) {
	return m.SelectPeople()
}

func (m *Model) InsertUser(p Person) (int, error) {
	return m.Insert(p)
}

func (m *Model) PersonIndex(ed EntryData) (int, error) {
	return m.Exists(ed)
}

func (m *Model) PersonInfo(id int) (UserInfo, error) {
	return m.SelectPerson(id)
}

func (m *Model) CreateAdmin() {
	m.AddAdmin()
}

////

func (m *Model) Tasks() ([]*Hometask, error) {
	return m.SelectTasks()
}

func (m *Model) InsertTask(task Hometask) (error) {
	return m.InsertHometask(task)
}

func (m *Model) DeleteTask(id int) (error) {
	return m.DeleteHometask(id)
}

////

func (m *Model) Problems() ([]*Problem, error) {
	return m.SelectProblems()
}

func (m *Model) InsertProblem1(problem Problem) (error) {
	return m.InsertProblem(problem)
}

func (m *Model) DeleteProblem1(id int) (error) {
	return m.DeleteProblem(id)
}
func (m *Model) SelectProblemsFromHometask1(hometaskid int) ([]*Problem, error) {
	return m.SelectProblemsFromHometask(hometaskid)
}

////