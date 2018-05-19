import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {StudentSem} from "../semesters/student_semester";
import {changeSem} from "../reducers/semesters/semester.action";

class StudentCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursem: 0,
        };
    }
    render(){
        const semesters = (new Array(this.props.numSemesters)).map((sem, index) => {
            return (<Tab eventKey={index} title={(index + 1) + ' semester'}/>);
        });
        let cur = this;
        return (
            <div>
                <h1>{this.props.coursename}</h1>
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                      onSelect={(e) => {cur.setState({cursem: e}); cur.props.changeSem(e, this.props.courseid);}}
                >
                    {semesters}
                </Tabs>
                <StudentSem/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    numSemesters: state.course.numSemesters,
    coursename: state.course.name
});

const mapDispatchToProps = (dispatch)  => ({
    changeSem: (num, numcourse) => { dispatch(changeSem(num, numcourse)); }
});

export const StudentCourse = connect(mapStateToProps, mapDispatchToProps)(StudentCourseImpl);