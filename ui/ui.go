package ui

import (
	"net"
	"net/http"
	"time"
	"hwproj/model"
	"hwproj/session"
	"html/template"

	"log"
	"encoding/json"
	"io/ioutil"
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
	//http.Handle("/sign_in", signHandler(m))
	http.Handle("/dist/", http.FileServer(cfg.Assets))
	http.Handle("/sign_in_server", signHandler(m))
	http.Handle("/sign_up_server", signUpHandler(m))
	http.Handle("/get_courses_server", getCourses(m))
	http.Handle("/add_course_server", addCourse(m))


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
