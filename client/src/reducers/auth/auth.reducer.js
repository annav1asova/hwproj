import { combineEpics } from 'redux-observable';
import { startLoginProcessEpic, startRegisterProcessEpic} from "./auth.epic";

export const authEpics$ = combineEpics(
    startLoginProcessEpic,
    startRegisterProcessEpic
);

const initState = {
    authInfo: {
        isAuthenticated: false,
        isTeacher: false,
        courses: null,
        firstName: null,
        lastName: null,
        email: null
    }
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER-LOGGED-IN':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: true,
                    isTeacher: action.userType,
                    courses: action.userCourses,
                    firstName: action.fn,
                    lastName: action.ln,
                    email: action.email
                }
            };
        case 'USER-LOGGED-OUT':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: false,
                    isTeacher: null,
                    courses: null,
                    firstName: null,
                    lastName: null,
                    email: null
                }
            };
        default:
            return state;
   }
};