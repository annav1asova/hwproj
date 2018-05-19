import React from 'react';
import { connect } from 'react-redux';
import {Router, Route} from 'react-router';
import {SignUp} from "./auth/sign_up";
import {SignIn} from "./auth/sign_in";
import {Courses} from "./courses/courses";
import {Edit} from "./auth/edit";
import {Course} from "./courses/course";

class RootImpl extends React.Component {
    render() {
        const withoutAuth = (<Router>
                                <Route exact path="/sign_in" component={SignIn} />
                                <Route exact path="/sign_up" component={SignUp} />
                                <Route exact path="/" component={Courses} />
                            </Router>);
        const withAuth = (<Router>
                            <Route exact path="/courses" component={Courses} />
                            <Route path="/courses/:idcourse/:idterm" component={Course} />
                            <Route exact path="/edit" component={Edit} />
                            <Route exact path="/" component={Courses} />
                        </Router>);
        const root = (this.props.isAuth ? withAuth : withoutAuth);
        return {root};
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authInfo.isAuthenticated
});

export const Root = connect(mapStateToProps)(RootImpl);