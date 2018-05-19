import {combineEpics} from "redux-observable/index";
import {getCoursesEpic, addCourseEpic, changeSemEpic} from "./course.epic";

export const coursesEpics$ = combineEpics(
    getCoursesEpic,
    addCourseEpic,
    changeSemEpic
);

const initState = {
    courses: {
        current: null,
        completed: null
    },
    course: {
        numSemesters: null,
        name: null
    },
    semester: {
        isFollowed: false,
        homeworks: null,
        table: null
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
        case 'RECEIVED-SEM':
            return {
                ...state,
                semester: {
                    isFollowed: action.isFollowed,
                    homeworks: action.homeworks,
                    table: action.table
                }
            };
        default:
            return state;
    }
};