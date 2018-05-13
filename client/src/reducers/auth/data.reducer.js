const initState = {
    curUserCourses: null,
    allCoursesCurrent: null,
    allCoursesCompleted: null
};

export const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-DATA':
            return {
                ...state,
                curUserCourses: action.curC,
                allCoursesCurrent: action.allCur,
                allCoursesCompleted: action.allCom
            };
        default:
            return state;
    }
};