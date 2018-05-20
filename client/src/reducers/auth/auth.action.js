export const startLoginProcess = (em, pass) => ({ type: 'START-LOGIN-PROCESS', email: em, password: pass});
export const startRegisterProcess = (fn, ln, em, pass) => ({ type: 'START-REGISTER-PROCESS', firstname: fn,
                                                            lastname: ln, email: em, password: pass});
export const startEditProcess = (fn, ln, em, pass, newpass) => ({ type: 'START-EDIT-PROCESS', firstname: fn,
    lastname: ln, email: em, password: pass, newpassword: newpass});
export const userLoggedIn = (isTeacher, userCourses, fn, ln, email) => ({ type: 'USER-LOGGED-IN', userType: isTeacher,
                                                                            userCourses: userCourses, fn: fn, ln: ln, email: email});
export const userLoggedOut = () => ({ type: 'USER-LOGGED-OUT' });
export const teacherInvite = (email) => ({ type: 'TEACHER_INVITE', email: email });