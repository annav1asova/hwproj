import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import { startLoginProcess } from '../reducers/auth/auth.action';
import {withRouter} from "react-router-dom";

class SignInImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render() {
        return (
        <Col xs={6} xsOffset={3}>
            <form onSubmit={e => { e.preventDefault(); this.props.onLoginClicked(this.state.email, this.state.password); }}>
                <FormGroup>
                    <ControlLabel>
                        Email:
                    </ControlLabel>
                    <FormControl
                        name="email"
                        type="text"
                        value={this.state.email}
                        placeholder="Enter email"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Password:
                    </ControlLabel>
                    <FormControl
                        name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Enter password"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
        </Col>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onLoginClicked: (em, pass) => { dispatch(startLoginProcess(em, pass)); }
});

export const SignIn = withRouter(connect(null, mapDispatchToProps)(SignInImpl));