package ui

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"time"

	"hwproj/model"
)

type Config struct {
	Assets http.FileSystem
}

func Start(cfg Config, m *model.Model, listener net.Listener) {

	server := &http.Server{
		ReadTimeout:    60 * time.Second,
		WriteTimeout:   60 * time.Second,
		MaxHeaderBytes: 1 << 16}

	http.Handle("/", indexHandler(m))
	http.Handle("/login", loginHandler(m))
	http.Handle("/load", loadHandler(m))
	http.Handle("/profile", profileHandler(m))
	http.Handle("/people", peopleHandler(m))
	http.Handle("/js/", http.FileServer(cfg.Assets))

	go server.Serve(listener)
}

func renderHTML(str string) string {
	return `
	<!DOCTYPE HTML>
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
	
		<script src="/js/menu.jsx" type="text/babel"></script>
		<script src="`+ str +`" type="text/babel"></script>
	  </body>
	</html>
	`;
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, renderHTML("/js/app.jsx"))
	})
}

func loginHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, renderHTML("/js/login.jsx"))
	})
}

func loadHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, renderHTML("/js/load.jsx"))
	})
}

func profileHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, renderHTML("/js/profile.jsx"))
	})
}

func peopleHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		people, err := m.People()
		if err != nil {
			http.Error(w, "This is an error", http.StatusBadRequest)
			return
		}

		js, err := json.Marshal(people)
		if err != nil {
			http.Error(w, "This is an error", http.StatusBadRequest)
			return
		}

		fmt.Fprintf(w, string(js))
	})
}
