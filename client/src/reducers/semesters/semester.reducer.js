import {combineEpics} from "redux-observable";
import {changeSemEpic} from "./semester.epic";

export const semesterEpics$ = combineEpics(
    changeSemEpic
);

const initState = {
    isFollowed: false,
    homeworks: null,
    table: null
};

export const semesterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVED-SEM':
            return {
                ...state,
                isFollowed: action.isFollowed,
                homeworks: action.homeworks,
                table: action.table
            };
        default:
            return state;
    }
};