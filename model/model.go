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

// board
//submissions
//links
//courses:

func (m *Model) Courses() ([]*Course, error) {
	return m.SelectCourses()
}

func (m *Model) InsertCourse(course Course) (error) {
	return m.InsertCourseDb(course)
}

func (m *Model) DeleteCourse(id int) (error) {
	return m.DeleteCourseDb(id)
}

func (m *Model) SelectCoursesOfTeacher(teacherid int) ([]*Course, error) {
	return m.SelectCoursesOfTeacherDb(teacherid)
}

func (m *Model) SelectActiveCoursesOfTeacher(teacherid int) ([]*Course, error) {
	return m.SelectActiveCoursesOfTeacherDb(teacherid)
}

func (m *Model) SelectActiveCourses() ([]*Course, error) {
	return m.SelectActiveCoursesDb()
}

func (m *Model) SelectNonActiveCourses() ([]*Course, error) {
	return m.SelectNonActiveCoursesDb()
}

func (m *Model) SelectActiveCoursesWithName() ([]*CourseInfo, error) {
	return m.SelectActiveCoursesWithNameDb()
}

func (m *Model) SelectNonActiveCoursesWithName() ([]*CourseInfo, error) {
	return m.SelectNonActiveCoursesWithNameDb()
}
///

func (m *Model) InsertConnection(conn Connection) (error) {
	return m.InsertConnectionDb(conn)
}

func (m *Model) DeleteConnection(conn Connection) (error) {
	return m.DeleteConnectionDb(conn)
}

func (m *Model) SelectCoursesOfStudent(id int) ([]*Course, error) {
	return m.SelectCoursesOfStudentDb(id)
}
