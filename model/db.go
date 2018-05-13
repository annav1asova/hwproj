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
	InsertProblemDb(problem Problem) (error)
	DeleteProblemDb(id int) (error)
	SelectProblemsFromHometaskDb(hometaskid int) ([]*Problem, error)

	////

	SelectCourses() ([]*Course, error)
	InsertCourseDb(course Course) (error)
	DeleteCourseDb(id int) (error)
	SelectCoursesOfTeacherDb(teacherid int) ([]*Course, error)
	SelectActiveCoursesDb() ([]*Course, error)
	SelectNonActiveCoursesDb() ([]*Course, error)
	SelectActiveCoursesWithNameDb() ([]*CourseInfo, error)
	SelectNonActiveCoursesWithNameDb() ([]*CourseInfo, error)
}