import {ofType} from 'redux-observable';
import axios from 'axios';
import 'rxjs';
import {receivedCourses} from "./course.action";

export const getCoursesEpic = (dispatch, action) =>{
    axios.post('/get_courses_server', {
        withCredentials: true
    }).then(response => {
        dispatch(receivedCourses(response.data.Active, response.data.Completed));
    });
};

export const addCourseEpic = (dispatch, action) =>{
    axios.post('/add_course_server', {
        'course': action.course,
        'group': action.group,
        withCredentials: true
    });
};