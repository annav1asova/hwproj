import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {teacherInvite} from "../reducers/auth/auth.action";
import {withRouter} from "react-router-dom";

class AddTeacherModalImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }

    render() {
        let cur = this;
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Invite another teacher:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={4}>
                                <ControlLabel>Email adress</ControlLabel>
                            </Col>
                            <Col sm={8}>
                                <FormControl
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    placeholder="Enter email"
                                    onChange={(e) => {cur.setState({email: e.target.value});}}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => {this.props.onSubmitClicked(this.state.email);
                        this.props.handleClose();}}>Submit</Button>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (em) => { dispatch(teacherInvite(em)); }
});

export const AddTeacherModal = withRouter(connect(null, mapDispatchToProps)(AddTeacherModalImpl));