import {ofType} from 'redux-observable';
import axios from 'axios';
import 'rxjs';
import {receivedSem} from "./semester.action";

export const changeSemEpic = (dispatch, action) =>{
    axios.post('/change_sem_server', {
        course: action.courseid,
        sem: action.number,
        withCredentials: true
    }).then(response => {
            console.log(response.data);
            return dispatch(receivedSem(response.data.IsFollowed, response.data.Homeworks, response.data.Table));
    });
};