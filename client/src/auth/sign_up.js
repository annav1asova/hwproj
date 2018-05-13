import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import {startRegisterProcess} from "../reducers/auth/auth.action";

class SignUpImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            fnValid: false,
            lnValid: false,
            emValid: false,
            passValid: false,
            formValid: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value);
            });
    }

    validateField(fieldName, value) {
        let fnValid = this.state.fnValid;
        let lnValid = this.state.lnValid;
        let emValid = this.state.emValid;
        let passValid = this.state.passValid;

        switch (fieldName) {
            case 'firstname':
                fnValid = value.length >= 2;
                break;
            case 'lastname':
                lnValid = value.length >= 2;
                break;
            case 'email':
                emValid = value.length >= 2;
                break;
            case 'password':
                passValid = value.length >= 2;
                break;
            default:
                break;
        }
        this.setState({
            fnValid: fnValid,
            lnValid: lnValid,
            emValid: emValid,
            passValid: passValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.fnValid &&
            this.state.lnValid && this.state.emValid && this.state.passValid});
    }

    validState(state) {
        if (state === true)
            return 'success';
        return 'error';
    }

    render() {
        return (
            <Col xs={6} xsOffset={3}>
                <form onSubmit={e => {this.props.startRegisterProcess(this.state.firstname, this.state.lastname,
                                                                this.state.email, this.state.password);}}>
                    <FormGroup
                        validationState={this.validState(this.state.fnValid)}
                    >
                        <ControlLabel>
                            First name:
                        </ControlLabel>
                        <FormControl
                            name="firstname"
                            type="text"
                            value={this.state.firstname}
                            placeholder="Enter first name"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup
                        validationState={this.validState(this.state.lnValid)}
                    >
                        <ControlLabel>
                            Last name:
                        </ControlLabel>
                        <FormControl
                            name="lastname"
                            type="text"
                            value={this.state.lastname}
                            placeholder="Enter last name"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup
                        validationState={this.validState(this.state.emValid)}
                    >
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
                    <FormGroup
                        validationState={this.validState(this.state.passValid)}
                    >
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
                    <Button type="submit" disabled={!this.state.formValid}>Submit</Button>
                </form>
            </Col>
        );
    }
}

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (fn, ln, em, pass) => { dispatch(startRegisterProcess(fn, ln, em, pass)); }
});

export const SignUp = connect(null, mapDispatchToProps)(SignUpImpl);