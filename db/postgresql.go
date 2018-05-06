package db

import (
	"database/sql"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Config struct {
	ConnectString string
}

func InitDb(cfg Config) (*pgDb, error) {
	if dbConn, err := sqlx.Connect("postgres", cfg.ConnectString); err != nil {
		return nil, err
	} else {
		p := &pgDb{dbConn: dbConn}
		if err := p.dbConn.Ping(); err != nil {
			return nil, err
		}
		if err := p.createTablesIfNotExist(); err != nil {
			return nil, err
		}
		if err := p.createSqlStatements(); err != nil {
			return nil, err
		}
		return p, nil
	}
}

type pgDb struct {
	dbConn *sqlx.DB

	sqlSelectPeople *sqlx.Stmt
	sqlInsertPerson *sql.Stmt
	sqlSelectPerson *sql.Stmt
	sqlExistsPerson *sql.Stmt
	sqlUpdatePerson *sql.Stmt

	sqlSelectHometasks *sqlx.Stmt
	sqlInsertHometask *sql.Stmt
	sqlDeleteHometask *sql.Stmt

	sqlSelectProblems *sqlx.Stmt
	sqlInsertProblem *sql.Stmt
	sqlDeleteProblem *sql.Stmt
	sqlSelectProblemsFromHometask *sqlx.Stmt
	sqlInsertAdmin *sql.Stmt

	sqlSelectCells *sqlx.Stmt
	sqlInsertCell *sql.Stmt
	sqlDeleteCell *sql.Stmt
	sqlGetScore *sqlx.Stmt

	sqlSelectSubmissions *sqlx.Stmt
	sqlInsertSubmission *sql.Stmt
	sqlDeleteSubmission *sql.Stmt
	sqlGetPullRequestOrFile *sqlx.Stmt
	sqlGetSubmissionsFromCell *sqlx.Stmt

	sqlSelectLinks *sqlx.Stmt
	sqlInsertLink *sql.Stmt
	sqlDeleteLink *sql.Stmt
	sqlSelectLinksFromHometask *sqlx.Stmt

	sqlSelectCourses *sqlx.Stmt
	sqlInsertCourse *sql.Stmt
	sqlDeleteCourse *sql.Stmt

	sqlSelectTerms *sqlx.Stmt
	sqlInsertTerm *sql.Stmt
	sqlDeleteTerm *sql.Stmt
	sqlSelectTermsFromCourse *sqlx.Stmt

	sqlSelectEnrollment *sqlx.Stmt
	sqlInsertEnrollment *sql.Stmt
	sqlUpdateEnrollment *sql.Stmt
	sqlSelectEnrollmentsToTerm *sqlx.Stmt
}

func (p *pgDb) createTablesIfNotExist() error {
	if err := p.createTableUsers(); err != nil {
		return err
	}
	if err := p.createTableHometasks(); err != nil {
		return err
	}
	if err := p.createTableProblems(); err != nil {
		return err
	}
	if err := p.createTableBoard(); err != nil {
		return err
	}
	if err := p.createTableSubmissions(); err != nil {
		return err
	}
	if err := p.createTableLinks(); err != nil {
		return err
	}
	if err := p.createTableCourses(); err != nil {
		return err
	}
	if err := p.createTableTerms(); err != nil {
		return err
	}
	if err := p.createTableEnrollment(); err != nil {
		return err
	}
	return nil
}

func (p *pgDb) createSqlStatements() error {
	if err := p.prepareUsersSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareHometasksSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareProblemsSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareBoardSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareSubmissionSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareLinksSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareCoursesSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareTermsSqlStatements(); err != nil {
		return err
	}
	if err := p.prepareEnrollmentSqlStatements(); err != nil {
		return err
	}
	return nil

}