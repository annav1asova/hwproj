import React from 'react';
import { connect } from 'react-redux';
import {StudentCourse} from "./student_course";
import {TeacherCourse} from "./teacher_course";
import {withRouter} from "react-router-dom";

class CourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            cursem: this.props.match.params.idterm
        };
    }
    render() {
        const course = (this.props.isTeacher ? <TeacherCourse courseid={this.state.idcourse}/>
            : <StudentCourse courseid={this.state.idcourse}/>);
        return {course};
    }
}

const mapStateToProps = (state) => ({
    isTeacher: state.authInfo.isTeacher
});

export const Course = withRouter(connect(mapStateToProps)(CourseImpl));