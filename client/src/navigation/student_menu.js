import { Nav, Navbar, NavbarBrand, NavDropdown, MenuItem} from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

class StudentMenuImpl extends React.Component {
    render() {
        const courses = this.props.courses.map((course, index) => {
            return (<MenuItem key={index}  href={'courses/' + course.Courseid + '/0'}>{course.Name}</MenuItem>);
        });
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    <Nav pullRight>
                        <NavDropdown title="Courses" id="basic-nav-dropdown">
                            {courses}
                            <MenuItem divider />
                            <MenuItem href="/courses">All courses</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <MenuItem href="/edit">Edit profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem href="/sign_out">Logout</MenuItem>
                        </NavDropdown>
                    </Nav>;
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.authInfo.courses
});

export const StudentMenu = withRouter(connect(mapStateToProps)(StudentMenuImpl));