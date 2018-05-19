import React from 'react';
import { Table } from 'react-bootstrap';

class PersonRow extends React.Component{
    render() {
        const tasks = this.props.person.tasks.map((task, index) => {
            return (<td>{task}</td>);
        });
        return (
            <tr>
                <td>{this.props.person.name}</td>
                <td>{this.props.person.todo}</td>
                {tasks}
            </tr>
        );
    }
}

export class PersonTable extends React.Component{
    getTaskList(hw) {
        return hw.map((task, index) => {
            return (<th>{index + 1}</th>);
        });
    }
    render() {
        const hws = this.props.homeworks.map((homework, index) => {
            return (<th colSpan="2" width="auto">{index+1}</th>);
        });
        var tasks = [];
        this.props.homeworks.map((homework) => {
            tasks = tasks.concat(this.getTaskList(homework));
        });
        var todo = 0;
        const people = this.props.table.map((person) => {
            todo += person.todo;
            return (<PersonRow person={person}/>);
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
        const tasks = this.props.hw.map((task, index) => {
            return (<p>{index + ") " + task.name}</p>);
        });
        return (
            <div>
                <div className="pull-right">
                    <Button onClick={this.props.onEditTask}><Glyphicon glyph="pencil"/></Button>
                </div>
                <h3>Homework {this.props.id}</h3>
                {tasks}
            </div>
        );
    }
}

export class Task extends React.Component{
    render() {
        const tasks = this.props.hw.map((task, index) => {
            return (<p>{index + ") " + task.name}</p>);
        });
        return (
            <div>
                <h3>Homework {this.props.id}</h3>
                {tasks}
            </div>
        );
    }
}