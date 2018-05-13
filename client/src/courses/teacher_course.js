import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, ListGroupItem, ListGroup } from 'react-bootstrap';
import {EditCourseModal} from "./edit_course_modal";
import {EditFollowersModal} from "./edit_followers_modal";
import {PersonTable, TeacherTask} from "./course_components";

class TeacherCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            cursem: this.props.match.params.idterm,
            showeditcourse: false,
            showfollowers: false
        };
    }
    render(){
        const semesters = this.props.course.semesters.map((sem, index) => {
            return (<Tab eventKey={index} title={(index + 1) + ' semester'}/>);
        });

        const homeworks = this.props.course.semesters[this.state.cursem].homeworks.map((hw, index) => {
            return (<TeacherTask hw={hw} id={index} onEditTask={this.editTask.bind(this)}/>);
        });
        let cur = this;
        const deleteCoursePopover = (<Popover id="1">Delete course</Popover>);
        const editCoursePopover = (<Popover id="2">Edit course</Popover>);
        const deleteSemPopover = (<Popover id="3">Delete semester</Popover>);
        const addSemPopover = (<Popover id="4">Add semester</Popover>);
        const followersPopover = (<Popover id="5">View list of all followers</Popover>);
        return (
            <Grid>
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={editCoursePopover}>
                        <Button onClick={this.handleShowEditCourse}><Glyphicon glyph="pencil"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteCoursePopover}>
                        <Button onClick={this.deleteCourse.bind(this)}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div>
                <h1>{this.state.coursename}</h1>
                {this.state.showeditcourse ? <EditCourseModal handleClose={e => {cur.setState({showeditcourse: false});}}/> : null}
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={addSemPopover}>
                        <Button onClick={this.addSem.bind(this)}><Glyphicon glyph="plus"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={followersPopover}>
                        <Button onClick={() => {cur.setState({showfollowers: true });}}><Glyphicon glyph="user"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteSemPopover}>
                        <Button onClick={this.deleteSem.bind(this)}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div>
                {this.state.showfollowers ? <EditFollowersModal handleClose={e => {cur.setState({showfollowers: false});}}/> : null}
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                      onSelect={(e) => {cur.setState({cursem: e});}}
                >
                    {semesters}
                </Tabs>

                <PersonTable data={this.state.semesters[this.state.cursem]}/>
                <div className="text-center"><Button href="/addhw">Add homework</Button></div>
                <h3>Tasks</h3>
                {homeworks}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    course:
});

export const TeacherCourse = connect(mapStateToProps)(TecherCourseImpl);