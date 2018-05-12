import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component} from 'react';
import {storeFactory} from './reducers/app.reducer';
import {WelcomeScreen} from './welcome-screen/welcome';

class App extends Component{
    render(){
        return(
            <div>
                <h1> Hello, World! </h1>
                <Provider store={storeFactory()}>
                    <WelcomeScreen/>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);