import React from 'react';
import { connect } from 'react-redux';

class CourseImpl extends React.Component {

}

const mapStateToProps = (state) => ({
    course:,
    isTeacher: state.authInfo.isTeacher
});

export const Course = connect(mapStateToProps)(CourseImpl);