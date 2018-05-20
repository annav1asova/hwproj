import { createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './auth/auth.reducer';
import {courseReducer} from "./courses/course.reducer";
import {semesterReducer} from "./semesters/semester.reducer";
import axios from 'axios';
import {userLoggedIn, userLoggedOut} from "./auth/auth.action";

/*export const fetchUserMiddleware = store => next => action => {
    switch(action.type)
    {
        case 'START-LOGIN-PROCESS':
            startLoginProcessEpic(store, action);
    }
    return next(action);
}; */
export const fetchUserMiddleware = ({ getState, dispatch }) => next => action => {
    if (action.type === 'START-LOGIN-PROCESS') {
        axios.defaults.withCredentials = true;
        axios.post('/sign_in_server', {
            'email': action.email,
            'pass': action.password
        }).then(response => {
            console.log(response.data);
            if (response.data.IsLogged) {
                console.log("Yes");
                dispatch(userLoggedIn(response.data.IsTeacher, response.data.UserCourses, response.data.Fn,
                    response.data.Ln, response.data.Email));
            }
            else {
                console.log("No");
                dispatch(userLoggedOut());
            }
        });
        return next(action); // pass the original
    } else { // pass other actions
        return next(action);
    }
};

const reducers = combineReducers({
    authInfo: authReducer,
    courses: courseReducer,
    semester: semesterReducer
});

export const storeFactory = () => {
    return createStore(reducers,{},applyMiddleware(fetchUserMiddleware));//createEpicMiddleware(rootEpics$)));
};