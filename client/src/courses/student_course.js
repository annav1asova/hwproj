import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {PersonTable, Task} from "./course_components";

class StudentCourseImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            cursem: this.props.match.params.idterm,
            isFollowed: false
        };
        this.changeSem = this.changeSem.bind(this);
    }
    changeSem() {
        let cur = this;
        if (!this.state.isTeacher) {
            axios.post('/isfollowed', {
                course: this.state.idcourse,
                sem: this.state.cursem,
                withCredentials: true
            }).then(function (response) {
                cur.setState({isFollowed: (response.data === 1)});
            });
        }
    }
    render(){
        const semesters = this.props.course.semesters.map((sem, index) => {
            return (<Tab eventKey={index} title={(index + 1) + ' semester'}/>);
        });

        const homeworks = this.props.course.semesters[this.state.cursem].homeworks.map((hw, index) => {
            return (<Task hw={hw} id={index}/>);
        });
        let cur = this;
        const followPopover = (<Popover id="5">Follow current semester</Popover>);
        const unfollowPopover = (<Popover id="6">Unfollow current semester</Popover>);
        return (
            <div>
                <h1>{this.props.course.coursename}</h1>
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
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                      onSelect={(e) => {cur.setState({cursem: e}); cur.changeSem();}}
                >
                    {semesters}
                </Tabs>
                <PersonTable data={this.props.course.semesters[this.state.cursem]}/>
                <h3>Tasks</h3>
                {homeworks}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    course:,
    isTeacher: state.authInfo.isTeacher
});

export const StudentCourse = connect(mapStateToProps)(StudentCourseImpl);