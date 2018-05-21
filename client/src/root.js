import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {SignUp} from "./auth/sign_up";
import {SignIn} from "./auth/sign_in";
import {Courses} from "./courses/courses";
import {Edit} from "./auth/edit";
import {Course} from "./courses/course";
import {Menu, WaitMenu} from "./navigation/menu";
import {AddHomework} from "./semesters/add_homework";
import { Grid } from 'react-bootstrap';
import {checkAuth} from "./reducers/auth/auth.action";
import {startLogoutProcess} from "./reducers/auth/auth.action";

const SignOutRoute = ({ isAuth: Auth, logout: onLogout, ...rest }) => {
    if (Auth)
        onLogout();
    return (<Route {...rest} render={props => (<Redirect to={{pathname: "/sign_in_in"}}/>)}/>);
};

const PrivateRoute = ({ component: Component, isAuth: Auth, redirect: toRedir, ...rest }) => {
    console.log(Auth ? Component : "redirect to " + toRedir);
    return (<Route
        {...rest}
        render={props =>
            Auth ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: toRedir
                    }}
                />
            )
        }
    />
    );
};

class RootImpl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.state);
        if (this.props.isAuth == null) {
            this.props.checkAuth();
            return <WaitMenu/>;
        }
        return (
            <div>
                <Router>
                    <div>
                        <Menu/>
                        <Grid>
                            <Switch>
                                <PrivateRoute isAuth={this.props.isAuth} redirect="/sign_in_in" exact path="/courses" component={Courses} />
                                <PrivateRoute isAuth={this.props.isAuth} redirect="/sign_in_in"
                                              exact path="/courses/:idcourse/:idterm/addhw"
                                              component={AddHomework} />
                                <PrivateRoute isAuth={this.props.isAuth} redirect="/sign_in_in" path="/courses/:idcourse/:idterm"
                                              component={Course} />
                                <PrivateRoute isAuth={this.props.isAuth} redirect="/sign_in_in" exact path="/edit" component={Edit} />
                                <PrivateRoute isAuth={!this.props.isAuth} redirect="/" exact path="/sign_in_in" component={SignIn}/>
                                <PrivateRoute isAuth={!this.props.isAuth} redirect="/" exact path="/sign_up" component={SignUp}/>
                                <SignOutRoute isAuth={this.props.isAuth} logout={this.props.logout} exact path="/sign_out"/>
                                <Route component={Courses}/>
                            </Switch>
                        </Grid>
                    </div>
                </Router>
            </div>
            );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authInfo.isAuthenticated,
    state: state
});

const mapDispatchToProps = (dispatch)  => ({
    checkAuth: () => { dispatch(checkAuth()); },
    logout: () => { dispatch(startLogoutProcess()); }
});

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootImpl);