import {combineEpics} from "redux-observable/index";
import {changeSemEpic} from "./semester.epic";

export const semesterEpics$ = combineEpics(
    changeSemEpic
);

const initState = {
    semester: {
        isFollowed: false,
        homeworks: null,
        table: null
    }
};

export const semesterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-SEM':
            return {
                ...state,
                semester: {
                    isFollowed: action.isFollowed,
                    homeworks: action.homeworks,
                    table: action.table
                }
            };
        default:
            return state;
    }
};