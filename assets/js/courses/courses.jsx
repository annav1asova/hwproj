let { Button,Grid,
    Row, Col, Tabs, Tab,
    ListGroupItem, ListGroup} = ReactBootstrap;
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            teacher: props.teacher,
            index: props.index
        };
    }
    render() {
        return (
            <ListGroupItem key={this.props.index} header={this.state.name}>{this.state.teacher}</ListGroupItem>
        );
    }
}

class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            query: props.query,
            data: []
        };
    }
    async componentDidMount() {
        let response = await axios.get('/courses', {
            params: {
                'courses': this.state.query
            },
            withCredentials: true
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({data: response.data});
        //example
        this.setState({data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
    }
    render() {
        const users = this.state.data.map((course, index) => {
            return (<Course name={course.name} teacher={course.teacher} index={index}/>);
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
                <Route path="/courses/:idcourse(\d+)/:idterm(\d+)?" component={window.BigCourse} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);