package ui

import (
	//"encoding/json"
	//"fmt"
	"net"
	"net/http"
	"time"

	"hwproj/model"
	//"io/ioutil"
	//"log"
	"hwproj/session"
	_"html/template"
	"html/template"
	"io/ioutil"
	"encoding/json"
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
	//http.Handle("/sign_up_server", signUpHandler(m))



	go server.Serve(listener)
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t,_ := template.ParseFiles("client/public/index.html")
		t.Execute(w, nil)
	})
}

//func signHandler(m *model.Model) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		w.Write([]byte("1"))
//	})
//}

func signHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//t,_ := template.ParseFiles("client/public/index.html")
		//t.Execute(w, nil)
		var params struct {
			Email    string `json:"email"`
			Password string `json:"pass"`
		}
		body, _ := ioutil.ReadAll(r.Body)
		json.Unmarshal(body, &params)
		var index, err =  m.PersonIndex(model.EntryData{params.Email, params.Password})
		if err == nil {
			sess := globalSessions.SessionStart(w, r)
			sess.Set("uid", index)
			type response struct {
				isLogged bool
				isTeacher bool
				userCourses []*model.Course
				fn string
				ln string
				email string
			}
			user, err := m.PersonInfo(sess.Get("uid").(int))
			var jsonResponse []byte
			if err != nil {
				jsonResponse, _ = json.Marshal(response{false, false, nil, "", "", ""})

			} else {
				jsonResponse, _ = json.Marshal(response{true, isTeacher(user),
				getCourses(user, m), user.FirstName, user.Surname, user.Email})
			}
			w.Write(jsonResponse)
			//w.Write([]byte("ты попал на хвпродж"))
		} else if index == -1 {
			//w.Write([]byte(err.Error()))
		} else if index == -2 {
			//w.Write([]byte(err.Error()))
		} else {
			//w.Write([]byte("Something went wrong :("))
		}
	})
}

//func signUpHandler(m *model.Model) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		var pers struct {
//			FirstName    string `json:"firstName"`
//			LastName     string `json:"lastName"`
//			Email    string `json:"email"`
//			Pass     string `json:"pass"`
//		}
//		body, _ := ioutil.ReadAll(r.Body)
//		json.Unmarshal(body, &pers)
//		index, err := m.InsertUser(model.NewPerson(0, pers.FirstName, pers.LastName, pers.Email, pers.Pass))
//		if err == nil {
//			sess := globalSessions.SessionStart(w, r)
//			sess.Set("uid", index)
//			w.Write([]byte("Вы зарегистрированы"))
//		} else {
//			w.Write([]byte(err.Error()))
//		}
//
//	})
//}

func isLoggedIn(r *http.Request, m *model.Model) (model.UserInfo, error) {
	sessions, err := globalSessions.GetUid(r)
	if err != nil {
		return model.UserInfo{}, err
	}
	user, err := m.PersonInfo(sessions.(int))
	return user, err
}

func isTeacher(info model.UserInfo) (bool) {
	return info.Type != "student"
}

func getCourses(user model.UserInfo, m *model.Model) (courses []*model.Course) {
	if isTeacher(user) {
		courses, _ = m.SelectActiveCoursesOfTeacher(user.Userid)
	} else {
		courses, _ = m.SelectCoursesOfStudent(user.Userid)
	}
	return courses
}


///sign_in_server
//'email,'pass'
//response: isLogged, isTeacher, userCourses, fn, ln, email
//
///sign_up_server
//'email','pass', 'fn', 'ln'
//esponse: isLogged, isTeacher, userCourses, fn, ln, email
