import { Modal, Button, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

class EditFollowersModalImpl extends React.Component {
    constructor(props) {
        super(props);
    }
    addFollower(e)
    {
        console.log(e);
    }
    deleteFollower(e)
    {
        console.log(e);
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
});

export const EditFollowersModal = withRouter(connect(null, mapDispatchToProps)(EditFollowersModalImpl));