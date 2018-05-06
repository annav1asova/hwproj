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
	//"time"
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

	//m.InsertUser(model.NewPerson(0, "anna", "vlasova", "anna@g.com", "pass"))

	//m.InsertHometask(model.Hometask{0, "Задание 2", time.Now(), true})
	//m.InsertProblem1(model.Problem{0, 1, "Вася и Петя кидают камушки блаблабла", 10})
	//m.InsertProblem1(model.Problem{0, 1, "Алена Люлина купила 60 арбузов", 10})

	//a, err := m.SelectProblemsFromHometask1(1)
	//print(a)

	if _, err := m.PersonIndex(model.EntryData{"admin@gmail.com", "admin"}); err != nil {
		m.CreateAdmin()
	}


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
