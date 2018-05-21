import { createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './auth/auth.reducer';
import {courseReducer} from "./courses/course.reducer";
import {semesterReducer} from "./semesters/semester.reducer";
import {startLoginProcessEpic, startRegisterProcessEpic, checkAuthEpic, startLogoutProcessEpic} from "./auth/auth.epic";
import {getCoursesEpic, addCourseEpic, startLoadCourseEpic} from "./courses/course.epic";
import {changeSemEpic} from "./semesters/semester.epic";

export const fetchUserMiddleware = ({ getState, dispatch }) => next => action => {
    switch(action.type)
    {
        case 'START-LOGIN-PROCESS':
            startLoginProcessEpic(dispatch, action);
            break;
        case 'START-REGISTER-PROCESS':
            startRegisterProcessEpic(dispatch, action);
            break;
        case 'GET-COURSES':
            getCoursesEpic(dispatch, action);
            break;
        case 'ADD-COURSE':
            addCourseEpic(dispatch, action);
            break;
        case 'CHANGE-SEM':
            changeSemEpic(dispatch, action);
            break;
        case 'CHECK-AUTH':
            checkAuthEpic(dispatch, action);
            break;
        case 'START-LOGOUT-PROCESS':
            startLogoutProcessEpic(dispatch, action);
            break;
        case 'START-LOAD-COURSE':
           startLoadCourseEpic(dispatch, action);
            break;
    }
    return next(action);
};

const reducers = combineReducers({
    authInfo: authReducer,
    courses: courseReducer,
    semester: semesterReducer
});

export const storeFactory = () => {
    return createStore(reducers,{},applyMiddleware(fetchUserMiddleware));
};