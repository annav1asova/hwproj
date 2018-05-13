import { combineEpics } from 'redux-observable';
import { startLoginProcessEpic, startRegisterProcessEpic} from "./auth.epic";

export const authEpics$ = combineEpics(
    startLoginProcessEpic,
    startRegisterProcessEpic
);

const initState = {
    authInfo: null
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER-LOGGED-IN':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: true,
                    isTeacher: action.userType
                }
            };
        case 'USER-LOGGED-OUT':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: false
                }
            };
        default:
            return state;
   }
};