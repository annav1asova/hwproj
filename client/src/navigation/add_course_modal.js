import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {addCourse} from "../reducers/courses/course.action";

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
            <Modal>
                <Modal.Header closeButton>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => {this.props.onSubmitClicked(this.state.coursename, this.state.group);}}>Submit</Button>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (course, gr) => { dispatch(addCourse(course, gr)); }
});

export const AddCourseModal = connect(null, mapDispatchToProps)(AddCourseModalImpl);