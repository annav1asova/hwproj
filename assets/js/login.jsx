let { Button } = ReactBootstrap;

var App = React.createClass({
    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large">
                    Login
                </Button>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));