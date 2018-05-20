import React from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import {startRegisterProcess} from "../reducers/auth/auth.action";
import {InputComponent} from "./input_component";

class SignUpImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confpass: "",
            fnValid: false,
            lnValid: false,
            emValid: false,
            passValid: false,
            confpassValid: false,
            formValid: false
        };
    }

    validateForm() {
        this.setState({formValid: this.state.fnValid &&
            this.state.lnValid && this.state.emValid && this.state.passValid && this.state.confpassValid});
    }

    render() {
        let cur = this;
        return (
            <Col xs={6} xsOffset={3}>
                <form onSubmit={e => {this.props.onSubmitClicked(
                    this.state.firstname, this.state.lastname, this.state.email, this.state.password);}}>
                    <InputComponent
                        value={this.state.firstname}
                        isValid={e => {cur.setState({firstname: e, fnValid: e.length >= 2}); cur.validateForm();
                            return e.length >= 2;}}
                        name={'First name:'}
                        isPass={false}
                        placeholder={"Enter first name"}
                    />
                    <InputComponent
                        value={this.state.lastname}
                        isValid={e => {cur.setState({lastname: e, lnValid: e.length >= 2}); cur.validateForm();
                            return e.length >= 2;}}
                        name={'Last name:'}
                        isPass={false}
                        placeholder={"Enter last name"}
                    />
                    <InputComponent
                        value={this.state.email}
                        isValid={e => {cur.setState({email: e, emValid: e.length >= 2}); cur.validateForm();
                            return e.length >= 2;}}
                        name={'Email:'}
                        isPass={false}
                        placeholder={"Enter email"}
                    />
                    <InputComponent
                        value={this.state.password}
                        isValid={e => {cur.setState({password: e, passValid: e.length >= 2}); cur.validateForm();
                            return e.length >= 2;}}
                        name={'Password:'}
                        isPass={true}
                        placeholder={"Enter password"}
                    />
                    <InputComponent
                        value={this.state.confpassword}
                        isValid={e => {cur.setState({confpassword: e, confpassValid: e === this.state.password}); cur.validateForm();
                            return e === this.state.password;}}
                        name={'Confirmation:'}
                        isPass={true}
                        placeholder={"Enter confirm of password"}
                    />
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