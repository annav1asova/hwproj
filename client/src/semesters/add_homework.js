import React from 'react';
import { connect } from 'react-redux';
import {Link, Task} from "../courses/homework_components";
import {Row, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
//import {DayPicker} from '';

class AddHWImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [{name:'',link:''}],
            tasks: [''],
            type: "hw",
            selectedDay: undefined
        };
        this.addLink = this.addLink.bind(this);
        this.addTask = this.addTask.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onDeleteLink = this.onDeleteLink.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }
    addLink() {
        this.setState({links: this.state.links.concat({name:'', link:''})});
    }
    addTask() {
        this.setState({tasks: this.state.tasks.concat('')});
    }
    onChangeName(i, event) {
        var newlinks = this.state.links;
        newlinks[i].name = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeLink(i, event) {
        var newlinks = this.state.links;
        newlinks[i].link = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks[i] = event.target.value;
        this.setState({tasks: newtasks});
    }
    onDeleteLink(i, event) {
        var newlinks = this.state.links;
        newlinks.splice(i, 1);
        this.setState({links: newlinks});
    }
    onDeleteTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks.splice(i, 1);
        this.setState({tasks: newtasks});
    }
    handleChangeSelect(e) {
        this.setState({type: e.target.value});
    }
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }
    render() {
        var cur = this;
        const links = this.state.links.map(function(item, index) {
            return (
                <div key={index}>
                    <Link data={item} id={index + 1} onChangeName={(e) => {cur.onChangeName(index, e);}}
                          onChangeLink={(e) => {cur.onChangeLink(index, e);}}
                          onDeleteLink={(e) => {cur.onDeleteLink(index, e);}}/>
                </div>
            );
        });
        const tasks = this.state.tasks.map(function(item, index) {
            return (
                <div key={index}>
                    <Task data={item} id={index + 1} onChangeTask={(e) => {cur.onChangeTask(index, e)}}
                          onDeleteTask={(e) => {cur.onDeleteTask(index, e)}}/>
                </div>
            );
        });
        return (
            <div>
                <Row>
                    <Col xs={2} xsOffset={5}>
                        <div className="text-center">
                            <FormGroup>
                                <ControlLabel>Select type</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleChangeSelect} defaultValue={this.state.type}>
                                    <option value="hw">Homework</option>
                                    <option value="test">Test</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                        <div className="text-center">
                            {this.state.selectedDay && <p>Day: {this.state.selectedDay.toLocaleDateString()}</p>}
                            {!this.state.selectedDay && <p>Choose a day</p>}
                            <DayPicker.Input onDayChange={this.handleDayChange} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        {links}
                    </div>
                    <Button onClick={this.addLink}>Add link</Button>
                </Row>
                <Row>
                    <div>
                        {tasks}
                    </div>
                    <Button onClick={this.addTask}>Add task</Button>
                </Row>
                <Row>
                    <div className="text-center"><Button onClick={e => {
                        this.props.onSubmitClicked(this.state.links, this.state.tasks, this.state.type, this.state.selectedDay);}
                    }>Submit</Button></div>
                </Row>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (links, tasks, type, day) => { dispatch(addHomework(links, tasks, type, day)); }
});

export const AddHomework = connect(mapStateToProps, mapDispatchToProps)(AddHWImpl);