import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Grid, OverlayTrigger, Button, Popover, Glyphicon} from 'react-bootstrap';
import {EditCourseModal} from "./edit_course_modal";
import {changeSem} from "../reducers/semesters/semester.action";
import {TeacherSem} from "../semesters/teacher_semester";

class TeacherCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursem: 0,
            showeditcourse: false
        };
    }
    render(){
        const semesters = (new Array(this.props.numSemesters)).map((sem, index) => {
            return (<Tab eventKey={index} title={(index + 1) + ' semester'}/>);
        });

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
                <TeacherSem courseid={this.props.courseid} cursem={this.state.cursem}/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    numSemesters: state.course.numSemesters,
    coursename: state.course.name
});

const mapDispatchToProps = (dispatch)  => ({
    changeSem: (num, numcourse) => { dispatch(changeSem(num, numcourse)); },
    deleteCourse: (numcourse) => { dispatch(deleteCourse(numcourse)); }
});

export const TeacherCourse = connect(mapStateToProps, mapDispatchToProps())(TeacherCourseImpl);