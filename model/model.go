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

func (m *Model) InsertProblem(problem Problem) (error) {
	return m.InsertProblemDb(problem)
}

func (m *Model) DeleteProblem(id int) (error) {
	return m.DeleteProblemDb(id)
}
func (m *Model) SelectProblemsFromHometask(hometaskid int) ([]*ProblemInfo, error) {
	return m.SelectProblemsFromHometaskDb(hometaskid)
}

// board

func (m *Model) GetScoresOfUserInTerm(userid int, termid int) ([]int, error) {
	return m.GetScoresOfUserInTermDb(userid, termid)
}
//submissions

//links

func (m *Model) Links() ([]*Link, error) {
	return m.SelectLinks()
}

func (m *Model) InsertLink(link Link) (error) {
	return m.InsertLinkDb(link)
}

func (m *Model) DeleteLink(id int) (error) {
	return m.DeleteLinkDb(id)
}
func (m *Model) SelectLinksFromHometask(hometaskid int) ([]*LinkInfo, error) {
	return m.SelectLinksFromHometaskDb(hometaskid)
}

//courses

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

//func (m *Model) SelectCourse(courseid int) (*CourseSm, error) {
//	return m.SelectCourseDb(courseid)
//}

func (m *Model) SelectCourseName(courseid int) (string, error) {
	return m.SelectCourseNameDb(courseid)
}

func (m *Model) SelectTermsNumber(courseid int) (int, error) {
	return m.SelectTermsNumberDb(courseid)
}

//terms
func (m *Model) SelectTermId(courseid int, termnumber int) (int, error) {
	return m.SelectTermIdDb(courseid, termnumber)

}

///

func (m *Model) InsertConnection(conn ConnectionTermUser) (error) {
	return m.InsertConnectionDb(conn)
}

func (m *Model) DeleteConnection(conn ConnectionTermUser) (error) {
	return m.DeleteConnectionDb(conn)
}

func (m *Model) SelectCoursesOfStudent(id int) ([]*Course, error) {
	return m.SelectCoursesOfStudentDb(id)
}

func (m *Model) SelectStudentsFromTerm(id int) ([]*UserName, error) {
	return m.SelectStudentsFromTermDb(id)
}

func (m *Model) ExistsConnectionDb(conn ConnectionTermUser) (bool) {
	return m.ExistsConnectionDb(conn)
}

///

func (m *Model) InsertTaskConnection(conn ConnectionTermUser) (error) {
	return m.InsertConnectionDb(conn)
}

func (m *Model) DeleteTaskConnection(conn ConnectionTermTask) (error) {
	return m.DeleteTaskConnectionDb(conn)
}

func (m *Model) SelectTasksInTerm(id int) ([]*Hometask, error) {
	return m.SelectTasksInTermDb(id)
}