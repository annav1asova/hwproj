const initState = {
    isAuthenticated: null,
    isTeacher: null,
    courses: null,
    firstName: null,
    lastName: null,
    email: null
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER-LOGGED-IN':
            console.log("User logged!");
            console.log(action.fn);
            console.log(state);
            var newstate =  {
                isAuthenticated: true,
                isTeacher: action.userType,
                courses: action.userCourses,
                firstName: action.fn,
                lastName: action.ln,
                email: action.email
            };
            console.log(newstate);
            return newstate;
        case 'USER-LOGGED-OUT':
            return {
                ...state,
                    isAuthenticated: false,
                    isTeacher: null,
                    courses: null,
                    firstName: null,
                    lastName: null,
                    email: null
            };
        default:
            return state;
   }
};