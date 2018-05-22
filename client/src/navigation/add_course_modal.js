import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button, Checkbox} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {addCourse} from "../reducers/courses/course.action";
import {withRouter} from "react-router-dom";

class AddCourseModalImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursename: "",
            group: ""
        };
    }
    render() {
        let cur = this;
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Add course:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={4}>
                                <ControlLabel>Course name</ControlLabel>
                            </Col>
                            <Col sm={8}>
                                <FormControl
                                    name="name"
                                    type="text"
                                    value={this.state.coursename}
                                    placeholder="Enter name"
                                    onChange={(e) => {cur.setState({coursename: e.target.value});}}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={4}>
                                <ControlLabel>Group</ControlLabel>
                            </Col>
                            <Col sm={8}>
                                <FormControl
                                    name="link"
                                    type="text"
                                    value={this.state.group}
                                    placeholder="Enter group"
                                    onChange={(e) => {cur.setState({group: e.target.value});}}/>
                            </Col>
                        </FormGroup>
                        <div className="text-center">
                        <FormGroup>
                            <Checkbox inline>Private</Checkbox>
                        </FormGroup>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => {this.props.onSubmitClicked(this.state.coursename, this.state.group);
                        this.props.handleClose();}}>Submit</Button>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (course, gr) => { dispatch(addCourse(course, gr)); }
});

export const AddCourseModal = withRouter(connect(null, mapDispatchToProps)(AddCourseModalImpl));