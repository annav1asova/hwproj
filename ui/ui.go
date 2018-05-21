package ui

import (
	"net"
	"net/http"
	"time"
	"hwproj/model"
	"hwproj/session"
	"html/template"

	"io/ioutil"
	"encoding/json"
	"log"
	"strconv"
)

var globalSessions *session.Manager
func init() {
	globalSessions, _ = session.NewManager("memory", "gosessionid", 3600)
	go globalSessions.GC()
}

type Config struct {
	Assets http.FileSystem
}

func Start(cfg Config, m *model.Model, listener net.Listener) {

	server := &http.Server{
		ReadTimeout:    60 * time.Second,
		WriteTimeout:   60 * time.Second,
		MaxHeaderBytes: 1 << 16}
	http.Handle("/", indexHandler(m))
	http.Handle("/dist/", http.FileServer(cfg.Assets))
	http.Handle("/sign_in_server", signHandler(m))
	http.Handle("/sign_up_server", signUpHandler(m))
	http.Handle("/sign_out_server", logoutHandler(m))
	http.Handle("/get_courses_server", getCourses(m))
	http.Handle("/add_course_server", addCourse(m))
	http.Handle("/change_sem_server", changeSem(m))
	http.Handle("/check_auth_server", checkAuth(m))
	http.Handle("/load_course_server", loadCourse(m))



	go server.Serve(listener)
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t,_ := template.ParseFiles("client/public/index.html")
		t.Execute(w, nil)
	})
}

func isTeacher(info model.UserInfo) (bool) {
	return info.Type != "student"
}

func getCoursesOfUser(user model.UserInfo, m *model.Model) (courses []*model.Course) {
	if isTeacher(user) {
		courses, _ = m.SelectActiveCoursesOfTeacher(user.Userid)
	} else {
		courses, _ = m.SelectCoursesOfStudent(user.Userid)
	}
	return
}

func changeSem(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var term struct {
			Course    	string `json:"course"`
			Sem	    	string `json:"sem"`
		}
		body, _ := ioutil.ReadAll(r.Body)
		json.Unmarshal(body, &term)

		courseid, err := strconv.Atoi(term.Course)
		if err != nil {
			log.Println(err)
		}
		sem, err := strconv.Atoi(term.Sem)
		if err != nil {
			log.Println(err)
		}

		var isFollowed bool
		var homeworks []model.HometaskWithProblems
		var table []model.RowOfTable

		type TermResponse struct {
			IsFollowed bool
			Homeworks []model.HometaskWithProblems
			Table []model.RowOfTable
		}

		user, err := isLoggedIn(r, m)
		if err != nil {
			isFollowed = false
		}
		termid, err := m.SelectTermId(courseid, sem+1)
		if err != nil {
			log.Print(err) //ошибка - нет такого сема
		} else {
			isFollowed =  m.ExistsConnectionDb(model.ConnectionTermUser{termid, user.Userid})
		}

		if tasks, err := m.SelectTasksInTerm(termid); err != nil {
			homeworks = nil
		} else {
			homeworks = make([]model.HometaskWithProblems, len(tasks))
			for i := 0; i < len(tasks); i++ {
				problems, _ := m.SelectProblemsFromHometask(tasks[i].Hometaskid)
				links, _ := m.SelectLinksFromHometask(tasks[i].Hometaskid)
				homeworks[i] = model.HometaskWithProblems{tasks[i], problems, links}
			}
		}



		if users, err := m.SelectStudentsFromTerm(termid); err != nil {
			table = nil
		} else {
			table = make([]model.RowOfTable, len(users))
			for i:= 0; i < len(users); i++ {
				scores, _ := m.GetScoresOfUserInTerm(users[i].Userid, termid)
				table[i] = model.RowOfTable{users[i], scores}
			}
		}

		log.Println(TermResponse{isFollowed, homeworks, table})
		jsonResponse, _ := json.Marshal(TermResponse{isFollowed, homeworks, table})
		w.Write(jsonResponse)
	})
}

func loadCourse(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var course struct {
			Course    	string `json:"course"`
		}
		body, _ := ioutil.ReadAll(r.Body)
		json.Unmarshal(body, &course)

		courseid, err := strconv.Atoi(course.Course)
		if err != nil {
			log.Println(err)
		}

		type CourseResponse struct {
			Name 				string
			TermsNumber 		int
		}

		courseName, _ := m.SelectCourseName(courseid)
		termsNumber, _ := m.SelectTermsNumber(courseid)
		jsonResponse, _ := json.Marshal(CourseResponse{courseName, termsNumber})
		w.Write(jsonResponse)
	})
}