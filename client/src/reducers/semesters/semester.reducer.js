import {combineEpics} from "redux-observable";
import {changeSemEpic} from "./semester.epic";

export const semesterEpics$ = combineEpics(
    changeSemEpic
);

const initState = {
    isFollowed: null,
    homeworks: null,
    table: null
};

export const semesterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGED-SEM':
            console.log("received");
            console.log(action.isFollowed);
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