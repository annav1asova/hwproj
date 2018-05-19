import React from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import {InputComponent} from "./input_component";
import {startEditProcess} from "../reducers/auth/auth.action";

class EditImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.fn,
            lastname: this.props.ln,
            email: this.props.email,
            password: "",
            confpassword: "",
            curpassword: "",
            fnValid: true,
            lnValid: true,
            emValid: true,
            passValid: true,
            confpassValid: true,
            formValid: true
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
                this.state.firstname, this.state.lastname, this.state.email,
                this.state.curpassword. this.state.password);}}>
                <InputComponent
                    value={this.state.firstname}
                    isValid={e => {cur.setState({firstname: e, fnValid: e.length >= 2}); cur.validateForm();}}
                    name={'First name:'}
                    isPass={false}
                    placeholder={"Enter first name"}
                />
                <InputComponent
                    value={this.state.lastname}
                    isValid={e => {cur.setState({lastname: e, lnValid: e.length >= 2}); cur.validateForm();}}
                    name={'Last name:'}
                    isPass={false}
                    placeholder={"Enter last name"}
                />
                <InputComponent
                    value={this.state.email}
                    isValid={e => {cur.setState({email: e, emValid: e.length >= 2}); cur.validateForm();}}
                    name={'Email:'}
                    isPass={false}
                    placeholder={"Enter email"}
                />
                <InputComponent
                    value={this.state.password}
                    isValid={e => {cur.setState({password: e, passValid: e.length >= 2}); cur.validateForm();}}
                    name={'Password:'}
                    isPass={true}
                    placeholder={"Enter password"}
                />
                <InputComponent
                    value={this.state.confpassword}
                    isValid={e => {cur.setState({confpassword: e, confpassValid: e.length >= 2}); cur.validateForm();}}
                    name={'Confirmation:'}
                    isPass={true}
                    placeholder={"Enter confirmation of the password"}
                />
                <InputComponent
                    value={this.state.curpassword}
                    isValid={e => {cur.setState({curpassword: e});}}
                    name={'current Password:'}
                    isPass={true}
                    placeholder={"Enter current password"}
                />
                <Button type="submit" disabled={!this.state.formValid}>Submit</Button>
            </form>
            </Col>
        );
    }
}

const mapStateToProps = (state) => ({
    fn: state.authInfo.firstName,
    ln: state.authInfo.lastName,
    em: state.authInfo.email
});

const mapDispatchToProps = (dispatch)  => ({
    onSubmitClicked: (fn, ln, em, pass, curpass) => { dispatch(startEditProcess(fn, ln, em, curpass, pass)); }
});

export const Edit = connect(mapStateToProps, mapDispatchToProps)(EditImpl);