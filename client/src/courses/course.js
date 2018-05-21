import React from 'react';
import { connect } from 'react-redux';
import {StudentCourse} from "./student_course";
import {TeacherCourse} from "./teacher_course";
import {withRouter} from "react-router-dom";
import {loadedCourse} from "../reducers/courses/course.action";
import {changeSem} from "../reducers/semesters/semester.action";

class CourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            idsem: this.props.match.params.idterm
        };
        this.props.load(this.state.idcourse);
        this.props.loadSem(this.state.idcourse, this.state.idsem);
    }
    render() {
        return (this.props.isTeacher ? <TeacherCourse courseid={this.state.idcourse} semid={this.state.idsem}/>
            : <StudentCourse courseid={this.state.idcourse} semid={this.state.idsem}/>);
    }
}

const mapStateToProps = (state) => ({
    isTeacher: state.authInfo.isTeacher
});

const mapDispatchToProps = (dispatch)  => ({
    load: (courseid) => { dispatch(loadedCourse(courseid)); },
    loadSem: (courseid, semid) => { dispatch(changeSem(courseid, semid)); }
});

export const Course = withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseImpl));