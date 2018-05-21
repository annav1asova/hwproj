import React from 'react';
import { connect } from 'react-redux';
import { Popover, Button, OverlayTrigger, Glyphicon, Grid} from 'react-bootstrap';
import {EditFollowersModal} from "./edit_followers_modal";
import {PersonTable, TeacherTask} from "../semesters/semester_components";
import {deleteSem, addSem} from "../reducers/semesters/semester.action";
import {withRouter} from "react-router-dom";

class TeacherSemImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showfollowers: false
        };
    }
    render(){
        console.log(this.props.homeworks);
        console.log(this.props.table);
        const homeworks = this.props.homeworks.map((hw, index) => {
            return (<TeacherTask hw={hw} id={index} onEditTask={this.props.editTask}/>);
        });
        let cur = this;
        const deleteSemPopover = (<Popover id="1">Delete semester</Popover>);
        const addSemPopover = (<Popover id="2">Add semester</Popover>);
        const followersPopover = (<Popover id="3">View list of all followers</Popover>);
        return (
            <Grid>
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={addSemPopover}>
                        <Button onClick={e => {this.props.addSem(this.props.courseid);}}><Glyphicon glyph="plus"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={followersPopover}>
                        <Button onClick={() => {cur.setState({showfollowers: true });}}><Glyphicon glyph="user"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteSemPopover}>
                        <Button onClick={e => {this.props.deleteSem(cur.props.cursem, this.props.courseid);}}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div>
                {this.state.showfollowers ? <EditFollowersModal handleClose={e => {cur.setState({showfollowers: false});}}/> : null}

                <PersonTable homeworks={this.props.homeworks} table={this.props.table}/>
                <div className="text-center">
                    <Button href={"/courses/"+this.props.courseid+"/"+this.props.cursem+"/addhw"}>
                    Add homework</Button>
                </div>
                <h3>Hometasks</h3>
                {homeworks}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    homeworks: state.semester.homeworks,
    table: state.semester.table
});

const mapDispatchToProps = (dispatch)  => ({
    editTask: (event) => { },
    addSem: (numcourse) => { dispatch(addSem(numcourse)); },
    deleteSem: (cursem, numcourse) => { dispatch(deleteSem(cursem, numcourse)); }
});

export const TeacherSem = withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherSemImpl));