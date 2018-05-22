import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

class PersonRow extends React.Component{
    render() {
        const tasks = this.props.person.Scores.map((task, index) => {
            //var maxscore = this.props.hw[]
            return (<td bgcolor="#D3EDF6" valign="center" align="center">{task}</td>);
        });
        return (
            <tr>
                <td>{this.props.person.User.FirstName + " " + this.props.person.User.Surname}</td>
                <td>0</td>
                {tasks}
            </tr>
        );
    }
}

export class PersonTable extends React.Component{
    getTaskList(hw) {
        return hw.Problems.map((task, index) => {
            return (<th>{index + 1} ({task.Maxscore})</th>);
        });
    }
    render() {
        const hws = this.props.homeworks.map((homework, index) => {
            return (<th colSpan={homework.Problems.length} width="auto">{index+1}</th>);
        });
        var tasks = [];
        this.props.homeworks.map((homework) => {
            tasks = tasks.concat(this.getTaskList(homework));
        });
        var todo = 0;
        const people = this.props.table.map((person) => {
            //todo += person.todo;
            return (<PersonRow person={person} hw={this.props.homeworks}/>);
        });
        return (
            <Table bordered>
                <thead>
                <tr>
                    <th>Student</th>
                    <th width="auto">ToDo</th>
                    {hws}
                </tr>
                <tr>
                    <th/>
                    <th>{todo}</th>
                    {tasks}
                </tr>
                </thead>
                <tbody>
                {people}
                </tbody>
            </Table>
        );
    }
}

export class TeacherTask extends React.Component{
    render() {
        const problems = this.props.hw.Problems.map((problem, index) => {
            return (<p>{(index + 1) + ") " + problem.Statement}</p>);
        });
        return (
            <div>
                <div className="pull-right">
                    <Button onClick={this.props.onEditTask}><Glyphicon glyph="pencil"/></Button>
                </div>
                <h3>Homework {this.props.id + 1} {this.props.hw.Hometask.Taskname}</h3>
                {problems}
            </div>
        );
    }
}

export class Task extends React.Component{
    render() {
        const problems = this.props.hw.Problems.map((problem, index) => {
            return (<p>{index + ") " + problem.Statement}</p>);
        });
        return (
            <div>
                <h3>Homework {this.props.id} {this.props.hw.Hometask.Taskname}</h3>
                {problems}
            </div>
        );
    }
}