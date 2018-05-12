let { Grid } = ReactBootstrap;

var News = React.createClass({
    render() {
        return (
            <Grid>
                <h1>News</h1>
            </Grid>
        );
    }
});

ReactDOM.render(<News />, document.getElementById('root'));