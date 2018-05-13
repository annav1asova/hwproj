import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component} from 'react';
import {storeFactory} from './reducers/app.reducer';
import { Grid } from 'react-bootstrap';
import {SignIn} from "./auth/sign_in";
import {Menu} from "./navigation/menu";
import {Router, Route} from 'react-router';
import {SignUp} from "./auth/sign_up";

class App extends Component{
    render(){
        return(
            <Grid>
                <h1> Hello, World! </h1>
                <Provider store={storeFactory()}>
                    <Menu/>
                    <Router>
                        <Route exact path="/sign_in" component={SignIn} />
                        <Route exact path="/sign_up" component={SignUp} />
                    </Router>
                    <SignIn/>
                </Provider>
            </Grid>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);