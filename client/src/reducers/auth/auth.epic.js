import {ofType} from 'redux-observable';
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from './auth.action';
import Rx from 'rxjs/Rx';

export const fetchUserMiddleware = store => next => action => {
    if (action.type === 'START-LOGIN-PROCESS') {
        axios.defaults.withCredentials = true;
        axios.post('/sign_in_server', {
            'email': action.email,
            'pass': action.password
        }).then(response => {
            console.log(response.data);
            store.dispatch(userLoggedOut());
        });
        return next(action); // pass the original
    } else { // pass other actions
        return next(action);
    }
};

export const startLoginProcessEpic = action$ =>
  action$.ofType('START-LOGIN-PROCESS')
    .map(action => {
        Rx.Observable.create(obs => {
            axios.defaults.withCredentials = true;
            axios.post('/sign_in_server', {
                'email': action.email,
                'pass': action.password
            }).then(response => {
                console.log(JSON.stringify(response));
                obs.next(userLoggedOut());
                obs.complete();
            });
        });
    });
            /*return response.isLogged
                ? userLoggedIn(response.isTeacher, response.userCourses, response.fn, response.ln, response.email)
                : userLoggedOut();}); */

export const startRegisterProcessEpic = action$ =>
    action$.ofType('START-LOGIN-PROCESS')
        .map(action => axios.post('/sign_up_server', {
            'email': action.email,
            'pass': action.password,
            'fn': action.firstname,
            'ln': action.lastname,
            withCredentials: true
        }))
        .map(response => response.isLogged
            ? userLoggedIn(response.isTeacher, response.userCourses, response.fn, response.ln, response.email)
            : userLoggedOut());