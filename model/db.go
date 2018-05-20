package model

type db interface {
	SelectPeople() ([]*Person, error)
	Insert(Person) (int, error)
	Exists(EntryData) (int, error)
	SelectPerson(int) (UserInfo, error)
	UpdatePerson(Person) (error)
	AddAdmin()

	SelectTasks() ([]*Hometask, error)
	InsertHometask(Hometask) (error)
	DeleteHometask(int) (error)

	SelectProblems() ([]*Problem, error)
	InsertProblem(Problem) (error)
	DeleteProblem(int) (error)
	SelectProblemsFromHometask(hometaskid int) ([]*Problem, error)

	SelectCourses() ([]*Course, error)
	InsertCourseDb(Course) (error)
	DeleteCourseDb(int) (error)
	SelectCoursesOfTeacherDb(int) ([]*Course, error)
	SelectActiveCoursesOfTeacherDb(int) ([]*Course, error)
	SelectActiveCoursesDb() ([]*Course, error)
	SelectNonActiveCoursesDb() ([]*Course, error)
	SelectActiveCoursesWithNameDb() ([]*CourseInfo, error)
	SelectNonActiveCoursesWithNameDb() ([]*CourseInfo, error)

	InsertConnectionDb(Connection) (error)
	DeleteConnectionDb(Connection) (error)
	SelectCoursesOfStudentDb(int) ([]*Course, error)
}
