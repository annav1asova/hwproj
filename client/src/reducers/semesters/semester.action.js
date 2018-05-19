export const changeSem = (num, numcourse) => ({ type: 'START-CHANGING-SEM', number: num, courseid: numcourse});
export const receivedSem = (isF, hw, tbl) => ({ type: 'CHANGED-SEM', isFollowed: isF, homeworks: hw, table : tbl});
export const addSem = (numcourse) => ({ type: 'ADD-SEM', courseid: numcourse});
export const deleteSem = (num, numcourse) => ({ type: 'DELETE-SEM', number: num, courseid: numcourse});