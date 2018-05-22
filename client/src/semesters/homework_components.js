import React from 'react';
import { Panel, Col, Button, Form, FormGroup, FormControl, ControlLabel, Glyphicon
    } from 'react-bootstrap';

export class Task extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <div className="pull-right">
                        <Button onClick={this.props.onDeleteTask}><Glyphicon glyph="remove"/></Button>
                    </div>
                    <h4>Task №{this.props.id}</h4>
                </Panel.Heading>
                <Panel.Body>
                    <Form>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Task</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    name="task"
                                    componentClass="textarea"
                                    value={this.props.data.task}
                                    placeholder="Enter task"
                                    onChange={this.props.onChangeTask}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Maxscore</ControlLabel>
                            </Col>
                            <Col sm={2}>
                                <FormControl
                                    name="maxscore"
                                    type="number"
                                    value={this.props.data.maxscore}
                                    onChange={this.props.onChangeMaxscore}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}

export class Link extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <div className="pull-right">
                        <Button onClick={this.props.onDeleteLink}><Glyphicon glyph="remove"/></Button>
                    </div>
                    <h4>Link №{this.props.id}</h4>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Name</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    name="name"
                                    type="text"
                                    value={this.props.data.name}
                                    placeholder="Enter name"
                                    onChange={this.props.onChangeName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Link</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    name="link"
                                    type="text"
                                    value={this.props.data.link}
                                    placeholder="Enter link"
                                    onChange={this.props.onChangeLink}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}