import {ofType} from 'redux-observable';
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from './auth.action';

export const startLoginProcessEpic = (dispatch, action) =>{
    axios.defaults.withCredentials = true;
    axios.post('/sign_in_server', {
        'email': action.email,
        'pass': action.password
    }).then(response => {
        if (response.data.IsLogged) {
            dispatch(userLoggedIn(response.data.IsTeacher, response.data.UserCourses, response.data.Fn,
                response.data.Ln, response.data.Email));
        }
    });
};

export const startRegisterProcessEpic = (dispatch, action) =>{
    axios.post('/sign_up_server', {
        'email': action.email,
        'pass': action.password,
        'fn': action.firstname,
        'ln': action.lastname,
        withCredentials: true
    }).then(response => {
        if (response.data.IsLogged) {
            dispatch(userLoggedIn(response.data.IsTeacher, response.data.UserCourses, response.data.Fn,
                response.data.Ln, response.data.Email));
        }
    });
};

export const checkAuthEpic = (dispatch, action) =>{
    axios.post('/check_auth_server', {
        withCredentials: true
    }).then(response => {
        if (response.data.IsLogged) {
            dispatch(userLoggedIn(response.data.IsTeacher, response.data.UserCourses, response.data.Fn,
                response.data.Ln, response.data.Email));
        }
    });
};