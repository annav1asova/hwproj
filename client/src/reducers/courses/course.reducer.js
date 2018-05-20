import {combineEpics} from "redux-observable";
import {getCoursesEpic, addCourseEpic} from "./course.epic";

export const coursesEpics$ = combineEpics(
    getCoursesEpic,
    addCourseEpic
);

const initState = {
    courses: {
        current: [],
        completed: []
    },
    course: {
        numSemesters: null,
        name: null
    }
};

export const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-COURSES':
            console.log("courses");
            console.log(action.current);
            console.log(action.completed);
            return {
                ...state,
                courses: {
                    current: action.current,
                    completed: action.completed
                }
            };
        default:
            return state;
    }
};