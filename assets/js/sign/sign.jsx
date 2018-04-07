let { Button, Grid,
    Row, Col,
    Tabs, Tab} = ReactBootstrap;

class LoginControl extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3}>
                        <Tabs defaultActiveKey={1}>
                            <Tab eventKey={1} title="Login">
                                <Auth/>
                            </Tab>
                            <Tab eventKey={2} title="Register">
                                <Register/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
ReactDOM.render(<LoginControl />, document.getElementById('root'));