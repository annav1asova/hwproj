package ui

import (
	"io/ioutil"
	"encoding/json"
	"fmt"
	"net/http"
	"hwproj/model"
)

func editedProfileHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
				var info struct {
					FirstName   	string `json:"firstname"`
					LastName 		string `json:"lastname"`
					Email    string `json:"email"`
					NewPass string `json:"pass"`
					CurPass string `json:"curpass"`
				}
				body, _ := ioutil.ReadAll(r.Body)
				json.Unmarshal(body, &info)
				index, err :=  m.PersonIndex(model.EntryData{info.Email, info.CurPass})
				if err == nil {
					m.UpdatePerson(model.NewPerson(index,info.FirstName,info.LastName,
						info.Email, info.NewPass))
					w.Write([]byte("OK"))
				} else {
					w.Write([]byte(err.Error()))
				}

			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/profile.jsx"}))
			}
		} else {
			http.Redirect(w, r, "/sign_in", 302)
		}
	})
}

func profileHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
				fmt.Println(user)
				jsonUser, _ := json.Marshal(user)
				fmt.Println(string(jsonUser))
				w.Write(jsonUser)
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/profile.jsx"}))
			}
		} else {
			http.Redirect(w, r, "/sign_in", 302)
		}
	})
}
