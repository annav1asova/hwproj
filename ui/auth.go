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
			us, _ := isLoggedIn(r, m)
			log.Print(us)
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

func isLoggedIn(r *http.Request, m *model.Model) (model.UserInfo, error) {
	sessions, err := globalSessions.GetUid(r)
	if err != nil {
		return model.UserInfo{}, err
	}
	user, err := m.PersonInfo(sessions.(int))
	return user, err
}

func responseAuth(m *model.Model, sess session.Session) ([]byte) {
	type Response struct {
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
		jsonResponse, _ = json.Marshal(Response{false, false, nil, "", "", ""})
	} else {
		jsonResponse, _ = json.Marshal(Response{true, isTeacher(user),
			getCourses(user, m), user.FirstName, user.Surname, user.Email})
		log.Println(Response{true, isTeacher(user),
			getCourses(user, m), user.FirstName, user.Surname, user.Email})
	}
	return jsonResponse
}