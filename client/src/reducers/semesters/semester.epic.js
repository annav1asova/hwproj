import {ofType} from 'redux-observable';
import axios from 'axios';
import 'rxjs';
import {receivedSem} from "./semester.action";

export const changeSemEpic = action$ =>
    action$.ofType('CHANGE-SEM')
        .map(action => axios.post('/change_sem_server', {
            course: action.courseid,
            sem: action.number,
            withCredentials: true
        }))
        .map(response => receivedSem(response.isFollowed, response.homeworks, response.table));