import React from 'react';
import { Dispatch, connect } from 'react-redux';
import { Button } from 'react-bootstrap'
import { startLoginProcess } from '../reducers/auth/auth.action';

const mapDispatchToProps = (dispatch)  => ({
    onloginClicked: () => { dispatch(startLoginProcess()); }
});

class WelcomeScreenImpl extends React.Component {
    render() {
        return (
            <Button onClick={this.props.onloginClicked}>Login</Button>
        );
    }
}

export const WelcomeScreen = connect(null, mapDispatchToProps)(WelcomeScreenImpl);