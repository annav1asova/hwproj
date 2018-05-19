import React from 'react';
import { connect } from 'react-redux';
import {StudentMenu} from "./student_menu";
import {TeacherMenu} from "./teacher_menu";
import {DefaultMenu} from "./default_menu";

class MenuImpl extends React.Component {
    render() {
        return (this.props.isLogged ? (this.props.isTeacher ? <TeacherMenu/> : <StudentMenu/>): <DefaultMenu/>);
    }
}

const mapStateToProps = (state) => ({
    isLogged: state.authInfo.isAuthenticated,
    isTeacher: state.authInfo.isTeacher
});

export const Menu = connect(mapStateToProps)(MenuImpl);