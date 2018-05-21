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
	InsertProblemDb(Problem) (error)
	DeleteProblemDb(int) (error)
	SelectProblemsFromHometaskDb(hometaskid int) ([]*ProblemInfo, error)

	SelectLinks() ([]*Link, error)
	InsertLinkDb(Link) (error)
	DeleteLinkDb(int) (error)
	SelectLinksFromHometaskDb(int) ([]*LinkInfo, error)

	SelectCourses() ([]*Course, error)
	InsertCourseDb(Course) (error)
	DeleteCourseDb(int) (error)
	SelectCoursesOfTeacherDb(int) ([]*Course, error)
	SelectActiveCoursesOfTeacherDb(int) ([]*Course, error)
	SelectActiveCoursesDb() ([]*Course, error)
	SelectNonActiveCoursesDb() ([]*Course, error)
	SelectActiveCoursesWithNameDb() ([]*CourseInfo, error)
	SelectNonActiveCoursesWithNameDb() ([]*CourseInfo, error)
	//SelectCourseDb(int) (*CourseSm, error)
	SelectCourseNameDb(courseid int) (string, error)
	SelectTermsNumberDb(courseid int) (int, error)

	GetScoresOfUserInTermDb(int, int) ([]int, error)

	SelectTermIdDb(int,int) (int, error)

	InsertConnectionDb(ConnectionTermUser) (error)
	DeleteConnectionDb(ConnectionTermUser) (error)
	SelectCoursesOfStudentDb(int) ([]*Course, error)
	SelectStudentsFromTermDb(int) ([]*UserName, error)
	ExistsConnectionDb(ConnectionTermUser) (bool)

	InsertTaskConnectionDb(ConnectionTermTask) (error)
	DeleteTaskConnectionDb(ConnectionTermTask) (error)
	SelectTasksInTermDb(int) ([]*Hometask, error)
}
