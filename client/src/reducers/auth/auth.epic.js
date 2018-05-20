import {ofType} from 'redux-observable';
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from './auth.action';
import 'rxjs';

export const startLoginProcessEpic = action$ =>
  action$.ofType('START-LOGIN-PROCESS')
    .map(action => {axios.defaults.withCredentials = true;
    return axios.post('/sign_in_server', {
            'email': action.email,
            'pass': action.password
        });
    })
    .map(response => response.isLogged
        ? userLoggedIn(response.isTeacher, response.userCourses, response.fn, response.ln, response.email)
        : userLoggedOut());

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