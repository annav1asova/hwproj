let { Button, Grid,
    Row, Col,
    ButtonGroup } = ReactBootstrap;

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.state = {
            isLoging: false,
        };
    }
    handleLoginClick() {
        this.setState({isLoging: true});
    }
    handleRegisterClick() {
        this.setState({isLoging: false});
    }

    render() {
        const isLoging = this.state.isLoging;
        const form = <Auth/>;
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={3}>
                        <ButtonGroup vertical>
                            <Button onClick={this.handleLoginClick}>Login</Button>
                            <Button onClick={this.handleRegisterClick}>Register</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={6}>
                        {this.state.isLoging ? <Auth/> : <Register/>}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
ReactDOM.render(<LoginControl />, document.getElementById('root'));