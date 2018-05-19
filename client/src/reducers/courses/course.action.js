export const getCourses = () => ({ type: 'GET-COURSES'});
export const receivedCourses = (cur, com) => ({ type: 'RECEIVED-COURSES', current: cur, completed: com });
export const addCourse = (course, group) => ({ type: 'ADD-COURSE', course: course, group: group});
export const changeSem = (num, numcourse) => ({ type: 'START-CHANGING-SEM', number: num, courseid: numcourse});
export const receivedSem = (isF, hw, tbl) => ({ type: 'CHANGED-SEM', isFollowed: isF, homeworks: hw, table : tbl});