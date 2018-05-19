import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component} from 'react';
import {storeFactory} from './reducers/app.reducer';
import { Grid } from 'react-bootstrap';
import {Root} from "./root";

class Main extends Component{
    render(){
        return(
                <Root/>
        );
    }
}

class App extends Component{
    render(){
        return(
            <Provider store={storeFactory()}>
                <Main/>
            </Provider>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);