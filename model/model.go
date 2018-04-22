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