import { Nav, Navbar, NavbarBrand, NavDropdown, MenuItem} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {AddCourseModal} from "./add_course_modal";
import {AddTeacherModal} from "./add_teacher_modal";
import {withRouter} from "react-router-dom";

class TeacherMenuImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showaddcourse: false,
            showadduser: false
        };
    }
    render() {
        const courses = this.props.courses.map((course, index) => {
            return (<MenuItem key={index}  href={'/courses/' + course.Courseid + '/0'}>{course.Name}</MenuItem>);
        });
        let cur = this;
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    <Nav pullRight>
                        <NavDropdown title="Courses" id="basic-nav-dropdown">
                            {courses}
                            <MenuItem divider />
                            <MenuItem onClick={e => {cur.setState({showaddcourse: true});}}>Add course</MenuItem>
                            <MenuItem href="/courses">All courses</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <MenuItem href="/edit">Edit profile</MenuItem>
                            <MenuItem onClick={e => {cur.setState({showadduser: true});}}>Invite another teacher</MenuItem>
                            <MenuItem divider />
                            <MenuItem href="/sign_out">Logout</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                {this.state.showaddcourse ? <AddCourseModal handleClose={e => {cur.setState({showaddcourse: false});}}/> : null}
                {this.state.showadduser ? <AddTeacherModal handleClose={e => {cur.setState({showadduser: false});}}/> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.authInfo.courses
});

export const TeacherMenu = withRouter(connect(mapStateToProps)(TeacherMenuImpl));