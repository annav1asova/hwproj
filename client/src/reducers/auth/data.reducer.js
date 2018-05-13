const initState = {
    curUserCourses: null,
    allCourses: null
};

export const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-DATA':
            return {
                ...state,
                curUserCourses: action.curC,
                allCourses: action.allC
            };
        default:
            return state;
    }
};