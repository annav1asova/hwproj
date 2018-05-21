export const getCourses = () => ({ type: 'GET-COURSES'});
export const receivedCourses = (cur, com) => ({ type: 'RECEIVED-COURSES', current: cur, completed: com });
export const addCourse = (course, group) => ({ type: 'ADD-COURSE', course: course, group: group});
export const deleteCourse = (course) => ({ type: 'DELETE-COURSE', course: course});
export const startLoadCourse = (course) => ({ type: 'START-LOAD-COURSE', course: course});
export const loadedCourse = (numsem, name) => ({ type: 'LOADED-COURSE', numsem: numsem, name: name});