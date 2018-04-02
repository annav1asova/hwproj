let { Button, Grid } = ReactBootstrap;

var App = React.createClass({
    render() {
        return (
            <Grid>
                <Button bsStyle="primary" bsSize="large">
                    Load
                </Button>
            </Grid>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));