import { Reducer } from 'redux';

const initState = {
    authInfo: null,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER-LOGGED-IN':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: true
                }
            };
        case 'START-LOGOUT-PROCESS':
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