import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component} from 'react';
import {storeFactory} from './reducers/app.reducer';
import { Grid } from 'react-bootstrap';
import {Menu} from "./navigation/menu";
import {Root} from "./root";

class App extends Component{
    render(){
        return(
            <Grid>
                <h1> Hello, World! </h1>
                <Provider store={storeFactory()}>
                    <Menu/>
                    <Root/>
                </Provider>
            </Grid>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);