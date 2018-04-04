package daemon

import (
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"hwproj/db"
	"hwproj/model"
	"hwproj/ui"
)

type Config struct {
	ListenSpec string

	Db db.Config
	UI ui.Config
}

func Run(cfg *Config) error {
	log.Printf("Starting, HTTP on: %s\n", cfg.ListenSpec)

	db, err := db.InitDb(cfg.Db)
	if err != nil {
		log.Printf("Error initializing database: %v\n", err)
		return err
	}

	m := model.New(db)

	m.InsertUser(model.NewPerson("настоящееимя", "ифамилия", "someemail@gmail.com","secure_password"))
	m.PersonIndex(model.EntryData{"someemail@gmail.com", "secure_password"})
	m.PersonIndex(model.EntryData{"someotheremail@gmail.com", "secure_password"})
	m.PersonIndex(model.EntryData{"someemail@gmail.com", "not_really_secure_password"})

	l, err := net.Listen("tcp", cfg.ListenSpec)
	if err != nil {
		log.Printf("Error creating listener: %v\n", err)
		return err
	}

	ui.Start(cfg.UI, m, l)

	waitForSignal()

	return nil
}

func waitForSignal() {
	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	s := <-ch
	log.Printf("Got signal: %v, exiting.", s)
}
