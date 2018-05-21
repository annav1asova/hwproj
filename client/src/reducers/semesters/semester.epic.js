import {ofType} from 'redux-observable';
import axios from 'axios';
import 'rxjs';
import {receivedSem} from "./semester.action";

export const changeSemEpic = (dispatch, action) =>{
    console.log(action.courseid);
    console.log(action.number);
    axios.post('/change_sem_server', {
        course: action.courseid,
        sem: action.number,
        withCredentials: true
    }).then(response => {
            dispatch(receivedSem(response.data.IsFollowed, response.data.Homeworks, response.data.Table));
    });
};