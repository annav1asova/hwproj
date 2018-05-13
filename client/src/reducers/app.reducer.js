import { createStore, combineReducers, applyMiddleware} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {authReducer, authEpics$} from './auth/auth.reducer';
import {dataReducer} from "./auth/data.reducer";


export const rootEpics$ = combineEpics(
    authEpics$
);

const reducers = combineReducers({
    authentication: authReducer,
    data: dataReducer
});

export const storeFactory = () => {
    return createStore(reducers, applyMiddleware(createEpicMiddleware(rootEpics$)));
};