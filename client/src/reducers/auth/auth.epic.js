import {ofType} from 'redux-observable';
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from './auth.action';

export const startLoginProcessEpic = store => action => {
        axios.defaults.withCredentials = true;
        axios.post('/sign_in_server', {
            'email': action.email,
            'pass': action.password
        }).then(response => {
            console.log(response.data);
            if (response.data.IsLogged)
                store.dispatch(userLoggedIn(response.data.IsTeacher, response.data.UserCourses, response.data.Fn,
                    response.data.Ln, response.data.Email));
            else
                store.dispatch(userLoggedOut());
        });
};

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