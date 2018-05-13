package ui

import (
	"net/http"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"hwproj/model"
)

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
			_, err := isLoggedIn(r, m)
			if err == nil {
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
			index, err := m.InsertUser(model.NewPerson(0, pers.FirstName, pers.LastName, pers.Email, pers.Pass))
			if err == nil {
				sess := globalSessions.SessionStart(w, r)
				sess.Set("uid", index)
				w.Write([]byte("Вы зарегистрированы"))
			} else {
				w.Write([]byte(err.Error()))
			}
		} else {
			_, err := isLoggedIn(r, m)
			if err == nil {
				http.Redirect(w, r, "/", 302)
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_up.jsx"}))
			}
		}
	})
}

func isLoggedHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			_, err := isLoggedIn(r, m)
			if err != nil {
				w.Write([]byte("0"))
			} else {
				w.Write([]byte("1"))
			}
		}
		// redirect to something
		// maybe we need an error page
	})
}