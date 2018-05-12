let { Button,
    FormGroup,
    ControlLabel,
    FormControl,
    Grid, Form,
    Col,
    Glyphicon,
    Panel, Row} = ReactBootstrap;

class Task extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <div className="pull-right">
                        <Button onClick={this.props.onDeleteTask}><Glyphicon glyph="remove"/></Button>
                    </div>
                    <h4>Task №{this.props.id}</h4>
                </Panel.Heading>
                <Panel.Body>
                <Form>
                    <FormGroup>
                        <Col sm={2}>
                            <ControlLabel>Task</ControlLabel>
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                name="task"
                                componentClass="textarea"
                                value={this.props.data}
                                placeholder="Enter name"
                                onChange={this.props.onChangeTask}/>
                        </Col>
                    </FormGroup>
                </Form>
                </Panel.Body>
            </Panel>
        )
    }
}

class Link extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <div className="pull-right">
                        <Button onClick={this.props.onDeleteLink}><Glyphicon glyph="remove"/></Button>
                    </div>
                    <h4>Link №{this.props.id}</h4>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Name</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    name="name"
                                    type="text"
                                    value={this.props.data.name}
                                    placeholder="Enter name"
                                    onChange={this.props.onChangeName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>Link</ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    name="link"
                                    type="text"
                                    value={this.props.data.link}
                                    placeholder="Enter link"
                                    onChange={this.props.onChangeLink}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        )
    }
}

class HW extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            links: [{name:'',link:''}],
            tasks: [''],
            type: "hw",
            selectedDay: undefined
        };
        this.addLink = this.addLink.bind(this);
        this.addTask = this.addTask.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onDeleteLink = this.onDeleteLink.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }
    addLink() {
        this.setState({links: this.state.links.concat({name:'', link:''})});
    }
    addTask() {
        this.setState({tasks: this.state.tasks.concat('')});
    }
    onChangeName(i, event) {
        var newlinks = this.state.links;
        newlinks[i].name = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeLink(i, event) {
        var newlinks = this.state.links;
        newlinks[i].link = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks[i] = event.target.value;
        this.setState({tasks: newtasks});
    }
    onDeleteLink(i, event) {
        var newlinks = this.state.links;
        newlinks.splice(i, 1);
        this.setState({links: newlinks});
    }
    onDeleteTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks.splice(i, 1);
        this.setState({tasks: newtasks});
    }
    sendData() {
        axios.post('/addhw', {
            'tasks': this.state.tasks,
            'links': this.state.links,
            'type' : this.state.type,
            'date' : this.state.selectedDay,
            withCredentials: true
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    handleChangeSelect(e) {
        this.setState({type: e.target.value});
    }
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }
    render() {
        var cur = this;
        const links = this.state.links.map(function(item, index) {
            return (
                <div key={index}>
                    <Link data={item} id={index + 1} onChangeName={(e) => {cur.onChangeName(index, e)}}
                                     onChangeLink={(e) => {cur.onChangeLink(index, e)}}
                                     onDeleteLink={(e) => {cur.onDeleteLink(index, e)}}/>
                </div>
            )
        });
        const tasks = this.state.tasks.map(function(item, index) {
            return (
                <div key={index}>
                    <Task data={item} id={index + 1} onChangeTask={(e) => {cur.onChangeTask(index, e)}}
                                    onDeleteTask={(e) => {cur.onDeleteTask(index, e)}}/>
                </div>
            )
        });
        return (
            <Grid>
                <Row>
                    <Col xs={2} xsOffset={5}>
                        <div className="text-center">
                            <FormGroup>
                                <ControlLabel>Select type</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleChangeSelect} defaultValue={this.state.type}>
                                    <option value="hw">Homework</option>
                                    <option value="test">Test</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                        <div className="text-center">
                            {this.state.selectedDay && <p>Day: {this.state.selectedDay.toLocaleDateString()}</p>}
                            {!this.state.selectedDay && <p>Choose a day</p>}
                            <DayPicker.Input onDayChange={this.handleDayChange} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        {links}
                    </div>
                    <Button onClick={this.addLink}>Add link</Button>
                </Row>
                <Row>
                    <div>
                        {tasks}
                    </div>
                    <Button onClick={this.addTask}>Add task</Button>
                </Row>
                <Row>
                    <div className="text-center"><Button onClick={this.sendData}>Submit</Button></div>
                </Row>
            </Grid>
        );
    }
}

var App = <HW/>

ReactDOM.render(App,document.getElementById('root'));