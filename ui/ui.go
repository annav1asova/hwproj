package ui

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"time"

	"hwproj/model"
	"io/ioutil"
	"log"
	"hwproj/session"
	_"html/template"
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
	http.Handle("/sign_in", loginHandler(m))
	http.Handle("/sign_up", registerHandler(m))
	http.Handle("/sign_out", logoutHandler(m))
	http.Handle("/load", loadHandler(m))
	http.Handle("/profile", profileHandler(m))
	http.Handle("/people", peopleHandler(m))
	http.Handle("/courses", coursesHandler(m))
	http.Handle("/js/", http.FileServer(cfg.Assets))

	go server.Serve(listener)
}

func renderHTML(str []string) string {
	result := `<!DOCTYPE HTML>
	<html>
	  <head>
		<meta charset="utf-8">
		<title>Simple Go Web App</title>
	  </head>
	  <body>
		<div id='menu'></div>
		<div id='root'></div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/15.3.2/react-dom.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.32.1/react-bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"/>
	
		<script src="/js/menu.jsx" type="text/babel"></script>`;
	for i := 0; i < len(str); i++ {
		result += `<script src="`+ str[i] +`" type="text/babel"></script>`;
	}
	result += `</body></html>`;
	return result;
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, renderHTML([]string{"/js/app.jsx"}))
	})
}

type People_Request struct {
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email    string `json:"email"`
	Pass     string `json:"pass"`
}

func loginHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Method)
		if r.Method == "GET" {
			if isLoggedIn(r) {
				http.Redirect(w, r, "/", 302)
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
			}
		} else {
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
				w.Write([]byte("ты попал на хвпродж"))
			} else if index == -1 {
				w.Write([]byte(err.Error()))
			} else if index == -2 {
				w.Write([]byte(err.Error()))
			} else {
				w.Write([]byte("Something went wrong :("))
			}
		}
	})

}

func logoutHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		globalSessions.SessionDestroy(w, r)
		http.Redirect(w, r, "/", 303)
	})
}

func registerHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Method)
		if r.Method == "POST"{
			var pers People_Request
			body, _ := ioutil.ReadAll(r.Body)
			json.Unmarshal(body, &pers)
			index, err := m.InsertUser(model.NewPerson(pers.FirstName, pers.LastName, pers.Email, pers.Pass))
			if err == nil {
				sess := globalSessions.SessionStart(w, r)
				sess.Set("uid", index)
				w.Write([]byte("Вы зарегистрированы"))
			} else {
				w.Write([]byte(err.Error()))
			}
		} else {
			if isLoggedIn(r) {
				http.Redirect(w, r, "/", 302)
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_up.jsx"}))
			}
		}
	})
}

func loadHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isLoggedIn(r) {
			fmt.Fprintf(w, renderHTML([]string{"/js/load.jsx"}))
		} else {
			fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func profileHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isLoggedIn(r) {
			if r.Method == "POST" {
				a := globalSessions.GetUid(r)
				user, err := m.PersonInfo(a.(int))
				if err != nil {
					w.Write([]byte(err.Error()))
				} else {
					fmt.Println(user)
					jsonUser, _ := json.Marshal(user)
					fmt.Println(string(jsonUser))
					w.Write(jsonUser)
				}
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/profile.jsx"}))
			}
		} else {
			fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func coursesHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isLoggedIn(r) {
			fmt.Fprintf(w, renderHTML([]string{"/js/courses.jsx"}))
		} else {
			fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func peopleHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		people, err := m.People()
		if err != nil {
			log.Printf("error in peopleHandler", err)
			http.Error(w, "This is an error", http.StatusBadRequest)
			return
		}

		js, err := json.Marshal(people)
		if err != nil {
			log.Printf("error in peopleHandler after marshal", err)
			http.Error(w, "This is an error", http.StatusBadRequest)
			return
		}

		fmt.Fprintf(w, string(js))
	})
}


func isLoggedIn(r *http.Request) bool {
	_, err:= r.Cookie("gosessionid")
	return err == nil
}