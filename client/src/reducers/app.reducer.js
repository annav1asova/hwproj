import { createStore, combineReducers, applyMiddleware} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {authReducer, authEpics$} from './auth/auth.reducer';
import {courseReducer, coursesEpics$} from "./courses/course.reducer";

export const rootEpics$ = combineEpics(
    authEpics$,
    coursesEpics$
);

const reducers = combineReducers({
    authentication: authReducer,
    courses: courseReducer
});

export const storeFactory = () => {
    return createStore(reducers, applyMiddleware(createEpicMiddleware(rootEpics$)));
};