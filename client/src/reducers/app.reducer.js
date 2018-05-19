import { createStore, combineReducers, applyMiddleware} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {authReducer, authEpics$} from './auth/auth.reducer';
import {courseReducer, coursesEpics$} from "./courses/course.reducer";
import {semesterReducer, semesterEpics$} from "./semesters/semester.reducer";

export const rootEpics$ = combineEpics(
    authEpics$,
    coursesEpics$,
    semesterEpics$
);

const reducers = combineReducers({
    authInfo: authReducer,
    courses: courseReducer,
    semester: semesterReducer
});

export const storeFactory = () => {
    return createStore(reducers, applyMiddleware(createEpicMiddleware(rootEpics$)));
};