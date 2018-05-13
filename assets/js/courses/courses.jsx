let { Button,Grid,
    Row, Col, Tabs, Tab,
    ListGroupItem, ListGroup} = ReactBootstrap;
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            query: props.query,
            data: [{id: 0, name: '', teacher: ''}]
        };
    }
    async componentDidMount() {
        /*let response = await axios.get('/courses', {
            params: {
                'courses': this.state.query
            },
            withCredentials: true
        }); */
        //this.setState({data: response.data});
        //example
        this.setState({data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
    }
    render() {
        const users = this.state.data.map((course, index) => {
            return (<ListGroupItem key={index} header={course.name}>{course.teacher}</ListGroupItem>);
        });
        return (
            <ListGroup>
                {users}
            </ListGroup>
        );
    }
}

class CoursesControl extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col>
                        <Tabs id='1' defaultActiveKey={1}>
                            <Tab eventKey={1} title="Current courses">
                                <Courses query={"current"}/>
                            </Tab>
                            <Tab eventKey={2} title="Completed courses">
                                <Courses query={"completed"}/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/courses" component={CoursesControl} />
                <Route path="/courses/:idcourse/:idterm" component={BigCourse} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);