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
	http.Handle("/addhw", addhwHandler(m))
	http.Handle("/menu", menuHandler(m))
	http.Handle("/islogged", isLoggedHandler(m))
	http.Handle("/isteacher", isTeacherHandler(m))
	http.Handle("/sign_in", loginHandler(m))
	http.Handle("/sign_up", registerHandler(m))
	http.Handle("/sign_out", logoutHandler(m))
	http.Handle("/load", loadHandler(m))
	http.Handle("/profile", profileHandler(m))
	http.Handle("/editprofile", editedProfileHandler(m))
	http.Handle("/people", peopleHandler(m))
	http.Handle("/courses", coursesHandler(m))
	http.Handle("/js/", http.FileServer(cfg.Assets))

	//for test
	http.Handle("/courses/1/1", coursesHandler(m))

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
		<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.32.1/react-bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min.js"></script>
		<script src="https://unpkg.com/react-day-picker/lib/daypicker.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"/>
		<link rel="stylesheet" href="https://unpkg.com/react-day-picker/lib/style.css">
	
		<script src="/js/menu.jsx" type="text/babel"></script>`;
	for i := 0; i < len(str); i++ {
		result += `<script src="`+ str[i] +`" type="text/babel"></script>`;
	}
	result += `</body></html>`;
	return result;
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
				//something
			} else {
				//если студент - то
				fmt.Fprintf(w, renderHTML([]string{"/js/news/studentnews.jsx"}))
				//иначе teachernews
			}
		} else {
			http.Redirect(w, r, "/sign_in", 302)
			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func addhwHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
				//GET DATA, PUT IT INTO BD
			} else {
				//если препод - то
				fmt.Fprintf(w, renderHTML([]string{"/js/addhw.jsx"}))
			}
		} else {
			http.Redirect(w, r, "/sign_in", 302)

			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func menuHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
				//something
			} else {
				fmt.Fprintf(w, renderHTML([]string{"/js/profile.jsx"}))
			}
		} else {
			http.Redirect(w, r, "/sign_in", 302)
			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func isTeacherHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			user, err := isLoggedIn(r, m)
			if err != nil {
				w.Write([]byte("0"))
			} else if isTeacher(user) {
				w.Write([]byte("1"))
			} else {
				w.Write([]byte("0"))
			}
		}
		// redirect to something
		// maybe we need an error page
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

func loadHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			fmt.Fprintf(w, renderHTML([]string{"/js/load.jsx"}))
		} else {
			http.Redirect(w, r, "/sign_in", 302)

			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

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

			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func profileHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := isLoggedIn(r, m)
		if err == nil {
			if r.Method == "POST" {
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
			http.Redirect(w, r, "/sign_in", 302)

			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
		}
	})
}

func coursesHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := isLoggedIn(r, m)
		if err == nil {
			fmt.Fprintf(w, renderHTML([]string{"/js/courses/course.jsx", "/js/courses/courses.jsx"}))
		} else {
			http.Redirect(w, r, "/sign_in", 302)

			//fmt.Fprintf(w, renderHTML([]string{"/js/sign/sign_in.jsx"}))
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