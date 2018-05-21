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
        numSemesters: 0,
        name: ""
    }
};

export const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-COURSES':
            return {
                ...state,
                courses: {
                    current: action.current,
                    completed: action.completed
                }
            };
        case 'LOADED-COURSE':
            return {
                ...state,
                course: {
                    numSemesters: action.numsem,
                    name: action.name
                }
            };
        default:
            return state;
    }
};