import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import {editCourse} from "../reducers/courses/course.action";

class EditCourseModalImpl extends React.Component {
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
                    <Modal.Title>Edit course:</Modal.Title>
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
                                    value={this.state.coursename_}
                                    placeholder="Enter name"
                                    onChange={(e) => {cur.setState({coursename_: e.target.value});}}/>
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
                                    value={this.state.group_}
                                    placeholder="Enter group"
                                    onChange={(e) => {cur.setState({group_: e.target.value});}}/>
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
    onSubmitClicked: (course, gr) => { dispatch(editCourse(course, gr)); }
});

export const EditCourseModal = withRouter(connect(null, mapDispatchToProps)(EditCourseModalImpl));