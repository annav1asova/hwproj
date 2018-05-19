import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {SignUp} from "./auth/sign_up";
import {SignIn} from "./auth/sign_in";
import {Courses} from "./courses/courses";
import {Edit} from "./auth/edit";
import {Course} from "./courses/course";
import {Menu} from "./navigation/menu";
import { Grid } from 'react-bootstrap';

class RootImpl extends React.Component {
    render() {
        const withoutAuth = (<Router>
                                <div>
                                    <Menu/>
                                    <Grid>
                                        <Route exact path="/sign_in_in" component={SignIn} />
                                        <Route exact path="/sign_up" component={SignUp} />
                                    </Grid>
                                </div>
                            </Router>);
        const withAuth = (<Router>
                            <div>
                                <Menu/>
                                <Grid>
                                    <Route exact path="/courses" component={Courses} />
                                    <Route path="/courses/:idcourse/:idterm" component={Course} />
                                    <Route exact path="/edit" component={Edit} />
                                </Grid>
                            </div>
                        </Router>);
        return (
            <div>
            {this.props.isAuth ? withAuth : withoutAuth}
            </div>
            );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authInfo.isAuthenticated
});

export const Root = connect(mapStateToProps)(RootImpl);
//export const Root = RootImpl;