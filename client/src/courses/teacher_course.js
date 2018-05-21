import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, OverlayTrigger, Button, Popover, Glyphicon} from 'react-bootstrap';
import {EditCourseModal} from "./edit_course_modal";
import {changeSem} from "../reducers/semesters/semester.action";
import {TeacherSem} from "../semesters/teacher_semester";
import {withRouter} from "react-router-dom";
import {deleteCourse} from "../reducers/courses/course.action";

class TeacherCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursem: this.props.semid,
            showeditcourse: false
        };
    }
    render(){
        console.log(this.props.state);
        console.log("LogInfo");
        console.log(this.state.cursem);
        console.log(this.props.numSemesters);
        console.log(this.props.isLoadedSem);
        var semesters = [];
        for (var i = 0; i < this.props.numSemesters; i++) {
            semesters[i] = (<Tab eventKey={i} title={(i + 1) + ' semester'}/>);
        }

        console.log(new Array(semesters));

        let cur = this;
        const deleteCoursePopover = (<Popover id="1">Delete course</Popover>);
        const editCoursePopover = (<Popover id="2">Edit course</Popover>);
        return (
            <Grid>
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={editCoursePopover}>
                        <Button onClick={e => {cur.setState({showeditcourse: true});}}><Glyphicon glyph="pencil"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteCoursePopover}>
                        <Button onClick={e => {this.props.deleteCourse(this.props.courseid);}}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div>
                <h1>{this.state.coursename}</h1>
                {this.state.showeditcourse ? <EditCourseModal handleClose={e => {cur.setState({showeditcourse: false});}}/> : null}
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                      onSelect={(e) => {cur.setState({cursem: e}); cur.props.changeSem(e, this.props.courseid);}}
                >
                    {semesters}
                </Tabs>
                {(this.state.cursem >= 0 && this.state.cursem < this.props.numSemesters && this.props.isLoadedSem) ?
                    <TeacherSem courseid={this.props.courseid} cursem={this.state.cursem}/>
                    : null}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    numSemesters: state.courses.course.numSemesters,
    coursename: state.courses.course.name,
    isLoadedSem: state.semester.isFollowed != null,
    state: state
});

const mapDispatchToProps = (dispatch)  => ({
    changeSem: (num, numcourse) => { dispatch(changeSem(num, numcourse)); },
    deleteCourse: (numcourse) => { dispatch(deleteCourse(numcourse)); }
});

export const TeacherCourse = withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherCourseImpl));