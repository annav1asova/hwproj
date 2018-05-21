import React from 'react';
import { connect } from 'react-redux';
import {StudentMenu} from "./student_menu";
import {TeacherMenu} from "./teacher_menu";
import {DefaultMenu} from "./default_menu";
import { Navbar, NavbarBrand } from 'react-bootstrap';
import {withRouter} from "react-router-dom";

export class WaitMenu extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                </Navbar>
            </div>
        );
    }
}

class MenuImpl extends React.Component {
    render() {
        return (this.props.isLogged ? (this.props.isTeacher ? <TeacherMenu/> : <StudentMenu/>): <DefaultMenu/>);
    }
}

const mapStateToProps = (state) => ({
    isLogged: state.authInfo.isAuthenticated,
    isTeacher: state.authInfo.isTeacher
});

export const Menu = withRouter(connect(mapStateToProps)(MenuImpl));