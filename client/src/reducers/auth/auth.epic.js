import {ofType} from 'redux-observable';
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from './auth.action';
import {receivedData} from "./data.action";
import 'rxjs';
import {Observable} from 'rxjs/Observable';

export const startLoginProcessEpic = action$ =>
  action$.ofType('START-LOGIN-PROCESS')
    .map(action => axios.post('/sign_in_server', {
            'email': action.email,
            'pass': action.password,
            withCredentials: true
        }))
    .map(response => response.isLogged
        ? Observable.concat(
            userLoggedIn(response.isTeacher),
            receivedData(response.allCourses, response.curCourses)
        )
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
            ? Observable.concat(
                userLoggedIn(response.isTeacher),
                receivedData(response.allCourses, response.curCourses)
            )
            : userLoggedOut());