package ui


import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"log"
	"hwproj/session"
	"hwproj/model"
)

func signHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
			w.Write(responseAuth(m, sess))
		} else if index == -1 {
			//w.Write([]byte(err.Error()))
		} else if index == -2 {
			//w.Write([]byte(err.Error()))
		} else {
			//w.Write([]byte("Something went wrong :("))
		}
	})
}

func signUpHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pers struct {
			Email    string `json:"email"`
			Pass     string `json:"pass"`
			Fn    	string `json:"fn"`
			Ln     	string `json:"ln"`
		}
		body, _ := ioutil.ReadAll(r.Body)
		json.Unmarshal(body, &pers)
		index, err := m.InsertUser(model.NewPerson(0, pers.Fn, pers.Ln, pers.Email, pers.Pass))
		if err == nil {
			sess := globalSessions.SessionStart(w, r)
			sess.Set("uid", index)
			w.Write(responseAuth(m, sess))
		} else {
			//w.Write([]byte(err.Error()))
		}
	})
}

func checkAuth(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var jsonResponse []byte
		if user, err := isLoggedIn(r, m); err == nil {
			jsonResponse, _ = json.Marshal(AuthResponse{true, isTeacher(user),
				getCoursesOfUser(user, m), user.FirstName, user.Surname, user.Email})
			log.Println(getCoursesOfUser(user, m))
		} else {
			jsonResponse, _ = json.Marshal(AuthResponse{false, false, nil, "", "", ""})
		}
		w.Write([]byte(jsonResponse))
	})
}

func logoutHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		globalSessions.SessionDestroy(w, r)
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

func responseAuth(m *model.Model, sess session.Session) ([]byte) {
	user, err := m.PersonInfo(sess.Get("uid").(int))
	var jsonResponse []byte
	if err != nil {
		jsonResponse, _ = json.Marshal(AuthResponse{false, false, nil, "", "", ""})
	} else {
		jsonResponse, _ = json.Marshal(AuthResponse{true, isTeacher(user),
			getCoursesOfUser(user, m), user.FirstName, user.Surname, user.Email})
		log.Println(getCoursesOfUser(user, m))

	}
	log.Println(jsonResponse)
	return jsonResponse
}

type AuthResponse struct {
	IsLogged bool
	IsTeacher bool
	UserCourses []*model.Course
	Fn string
	Ln string
	Email string
}