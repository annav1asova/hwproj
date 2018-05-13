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
	http.Handle("/sign_in", signHandler(m))
	http.Handle("/dist/", http.FileServer(cfg.Assets))

	go server.Serve(listener)
}

func indexHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t,_ := template.ParseFiles("client/public/index.html")
		t.Execute(w, nil)
	})
}

func signHandler(m *model.Model) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("1"))
	})
}
