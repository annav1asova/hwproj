import React from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger, Button, Glyphicon} from 'react-bootstrap';
import {PersonTable, Task} from "./semester_components";

class StudentSemImpl extends React.Component {
    render(){
        const homeworks = this.props.homeworks.map((hw, index) => {
            return (<Task hw={hw} id={index}/>);
        });
        const followPopover = (<Popover id="1">Follow current semester</Popover>);
        const unfollowPopover = (<Popover id="2">Unfollow current semester</Popover>);
        return (
            <div>
                <div className="pull-right">
                    {this.props.isFollowed ?
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={followPopover}>
                            <Button onClick={this.follow.bind(this)}><Glyphicon glyph="plus"/></Button>
                        </OverlayTrigger> :
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={unfollowPopover}>
                            <Button onClick={this.unfollow.bind(this)}><Glyphicon glyph="minus"/></Button>
                        </OverlayTrigger>
                    }
                </div>
                <PersonTable table={this.props.table} homeworks={this.props.homeworks}/>
                <h3>Tasks</h3>
                {homeworks}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isFollowed: state.semester.isFollowed,
    homeworks: state.semester.homeworks,
    table: state.semester.table
});

export const StudentSem = connect(mapStateToProps)(StudentSemImpl);