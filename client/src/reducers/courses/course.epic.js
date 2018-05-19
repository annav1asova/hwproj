import {ofType} from 'redux-observable';
import axios from 'axios';
import 'rxjs';
import {receivedCourses} from "./course.action";

export const getCoursesEpic = action$ =>
    action$.ofType('GET-COURSES')
        .map(action => axios.post('/get_courses_server', {
            withCredentials: true
        }))
        .map(response => receivedCourses(response.current, response.completed));

export const addCourseEpic = action$ =>
    action$.ofType('ADD-COURSE')
        .map(action => axios.post('/add_course_server', {
            'course': action.course,
            'group': action.group,
            withCredentials: true
        }));
