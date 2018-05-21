import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {StudentSem} from "../semesters/student_semester";
import {changeSem} from "../reducers/semesters/semester.action";
import {withRouter} from "react-router-dom";

class StudentCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursem: this.props.semid,
        };
    }
    render(){
        var semesters = [];
        for (var i = 0; i < this.props.numSemesters; i++) {
            semesters[i] = (<Tab eventKey={i} title={(i + 1) + ' semester'}/>);
        }
        let cur = this;
        return (
            <div>
                <h1>{this.props.coursename}</h1>
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                      onSelect={(e) => {cur.setState({cursem: e}); cur.props.changeSem(e, this.props.courseid);}}
                >
                    {semesters}
                </Tabs>
                {this.state.cursem >= 0 && this.state.cursem < this.props.numSemesters &&  this.props.isLoadedSem ?
                    <StudentSem/>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    numSemesters: state.courses.course.numSemesters,
    coursename: state.courses.course.name,
    isLoadedSem: state.semester.isFollowed != null
});

const mapDispatchToProps = (dispatch)  => ({
    changeSem: (num, numcourse) => { dispatch(changeSem(numcourse, num)); }
});

export const StudentCourse = withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentCourseImpl));