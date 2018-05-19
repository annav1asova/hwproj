import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';

class EditFollowersModalImpl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const followers = this.state.followers.map((user, index) => {
            return (
                <ListGroupItem key={index}>
                    <div className="pull-right">
                        <Button bsSize="small" onClick={this.addFollower.bind(this)}><Glyphicon glyph="ok"/></Button>
                        <Button bsSize="small" onClick={this.deleteFollower.bind(this)}><Glyphicon glyph="remove"/></Button>
                    </div>
                    {user}
                </ListGroupItem>);
        });
        return (
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>List of followers:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {followers}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (course, gr) => { dispatch(editCourse(course, gr)); }
});

export const EditFollowersModal = connect(null, mapDispatchToProps)(EditFollowersModalImpl);