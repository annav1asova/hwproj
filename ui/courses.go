package ui

import (
	"hwproj/model"
	"net/http"
	"log"
	"encoding/json"
	"io/ioutil"
)

func getCourses(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		type Response struct {
			Active []*model.CourseInfo
			Completed []*model.CourseInfo
		}
		if activeCourses, err := m.SelectActiveCoursesWithName(); err != nil {
			log.Println(err)
		} else if completedCourses, err := m.SelectNonActiveCoursesWithName(); err != nil {
			log.Println(err)
		} else {
			jsonCourses, _ := json.Marshal(Response{activeCourses, completedCourses})
			w.Write(jsonCourses)
		}
	})
}


func addCourse(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var course struct {
			Course    string `json:"course"`
			Group     string `json:"group"`
		}
		body, _ := ioutil.ReadAll(r.Body)
		json.Unmarshal(body, &course)

		user, err := isLoggedIn(r, m)
		if err != nil {
			log.Println(err)
		}
		if isTeacher(user) {
			err = m.InsertCourse(model.Course{-1, course.Course, course.Group, user.Userid, true})
			log.Println(err)
		}
	})
}
