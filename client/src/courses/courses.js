import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, ListGroupItem, ListGroup } from 'react-bootstrap';
import {getCourses} from "../reducers/courses/course.action";
import {withRouter} from "react-router-dom";

class CoursesImpl extends React.Component {
    constructor(props) {
        super(props);
        props.getData();
    }

    render() {
        if (this.props.current === undefined || this.props.completed === undefined)
            return (<div>Loading</div>);
        const current = this.props.current.map((course, index) => {
            return (<ListGroupItem key={index} header={course.Name}>{course.Firstname + ' ' + course.Surname}</ListGroupItem>);
        });
        const completed = this.props.completed.map((course, index) => {
            return (<ListGroupItem key={index} header={course.Name}>{course.Firstname + ' ' + course.Surname}</ListGroupItem>);
        });
        return (
            <Tabs id='1' defaultActiveKey={1}>
                <Tab eventKey={1} title="Current courses">
                    <ListGroup>
                        {current}
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="Completed courses">
                    <ListGroup>
                        {completed}
                    </ListGroup>
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    current: state.courses.courses.current,
    completed: state.courses.courses.completed
});

const mapDispatchToProps = (dispatch)  => ({
    getData: () => { dispatch(getCourses()); }
});

export const Courses = withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesImpl));