import { createStore, combineReducers, Reducer, applyMiddleware, Action, Middleware } from 'redux';
import {authReducer} from './auth/auth.reducer';

const reducers = combineReducers({
    authentication: authReducer
});

export const storeFactory = () => {
    return createStore(reducers);
};