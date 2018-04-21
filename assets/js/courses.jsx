let { Button,Grid,
    Row, Col, Tabs, Tab,
    ListGroupItem, ListGroup} = ReactBootstrap;

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
            <ListGroupItem header={this.state.name}>{this.state.teacher}</ListGroupItem>
        );
    }
}

class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            query: props.query
        };
    }
    render() {
        var data;
        axios.get('/courses', {
            params: {
                'courses': this.state.query
            }
        }).then(function (response) {
            data = response.data;
        })
            .catch(function (error) {
                console.log(error);
            });
        //example
        data = [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}];
        const users = data.map((course, index) => {
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
                        <Tabs defaultActiveKey={1}>
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

ReactDOM.render(<CoursesControl />, document.getElementById('root'));