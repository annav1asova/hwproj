export const getCourses = () => ({ type: 'GET-COURSES'});
export const receivedCourses = (cur, com) => ({ type: 'RECEIVED-COURSES', current: cur, completed: com });
export const addCourse = (course, group) => ({ type: 'ADD-COURSE', course: course, group: group});