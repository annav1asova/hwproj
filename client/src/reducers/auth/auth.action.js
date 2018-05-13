export const startLoginProcess = (em, pass) => ({ type: 'START-LOGIN-PROCESS', email: em, password: pass});
export const startRegisterProcess = (fn, ln, em, pass) => ({ type: 'START-REGISTER-PROCESS', firstname: fn,
                                                            lastname: ln, email: em, password: pass});
export const userLoggedIn = isTeacher => ({ type: 'USER-LOGGED-IN', userType: isTeacher });
export const userLoggedOut = () => ({ type: 'USER-LOGGED-OUT' });