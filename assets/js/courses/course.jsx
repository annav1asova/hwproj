let { Button,Grid,
    Table,
    Tab, Tabs,
    Glyphicon,
    OverlayTrigger,
    Popover} = ReactBootstrap;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

class PersonRow extends React.Component{
    render() {
        const tasks = this.props.person.tasks.map((task, index) => {
            return (<td>{task}</td>);
        });
        return (
            <tr>
                <td>{this.props.person.name}</td>
                <td>{this.props.person.todo}</td>
                {tasks}
            </tr>
        );
    }
}

class PersonTable extends React.Component{
    getTaskList(hw) {
        return hw.map((task, index) => {
            return (<th>{index + 1}</th>);
        });
    }
    render() {
        const hws = this.props.data.homeworks.map((homework, index) => {
            return (<th colSpan="2" width="auto">{index+1}</th>);
        });
        var tasks = [];
        this.props.data.homeworks.map((homework, index) => {
            tasks = tasks.concat(this.getTaskList(homework));
        });
        const people = this.props.data.table.map((person, index) => {
            return (<PersonRow person={person}/>);
        });
        return (
            <Table bordered>
                <thead>
                <tr>
                    <th>Student</th>
                    <th width="auto">ToDo</th>
                    {hws}
                </tr>
                <tr>
                    <th/>
                    <th>{this.props.data.todo}</th>
                    {tasks}
                </tr>
                </thead>
                <tbody>
                    {people}
                </tbody>
            </Table>
        );
    }
}
class Task extends React.Component{
    render() {
        const tasks = this.props.hw.map((task, index) => {
            return (<p>{index + ") " + task.name}</p>);
        });
        return (
            <div>
                {this.props.isTeacher ? <div className="pull-right">
                    <Button onClick={this.props.onEditTask}><Glyphicon glyph="pencil"/></Button>
                </div> : <div/>}
                <h3>Homework {this.props.id}</h3>
                {tasks}
            </div>
        );
    }
}

class BigCourse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            cursem: this.props.match.params.idterm,
            coursename: "Awesome course",
            group: "244",
            coursename_: "Awesome course",
            group_: "244",
            showeditcourse: false,
            semesters: [
                {
                    todo:3,
                    table: [
                        {
                            name:"Anna Vlasova",
                            todo: 0,
                            tasks:[1,2,3,7]
                        },
                        {
                            name:"Natalia Ponomareva",
                            todo: 0,
                            tasks:[4,5,6,8]
                        }
                    ],
                    homeworks: [
                        [
                            {name: "Something"},
                            {name: "wow, cool"}
                        ],
                        [
                            {name: "YEee"},
                            {name: "Another"}
                        ]
                    ]
                },
                {
                    todo:4,
                    table: [
                        {
                            name:"Anna Vlasova",
                            todo: 0,
                            tasks:[1,2]
                        },
                        {
                            name:"Natalia Ponomareva",
                            todo: 0,
                            tasks:[4,5]
                        }
                    ],
                    homeworks: [[
                        {name: "Something2"},
                        {name: "wow, cool2"}
                    ]]
                }
            ],
            isTeacher: false,
            isFollowed: false
        };
        this.handleShowEditCourse = this.handleShowEditCourse.bind(this);
        this.handleCloseEditCourse = this.handleCloseEditCourse.bind(this);
        this.handleSubmitEditCourse = this.handleCloseEditCourse.bind(this);
        this.changeSem = this.changeSem.bind(this);
    }
    handleSubmitEditCourse() {
        axios.post('/editcourse', {
            name: this.state.coursename,
            group: this.state.group,
            withCredentials: true
        });
        this.setState({ showeditcourse: false, coursename: this.state.coursename_, group: this.state.group_ });
    }
    handleCloseEditCourse() {
        this.setState({ showeditcourse: false, coursename_: this.state.coursename,group_:this.state.group });
    }
    handleShowEditCourse() {
        this.setState({ showeditcourse: true });
    }
    changeSem() {
        let cur = this;
        if (!this.state.isTeacher) {
            axios.post('/isfollowed', {
                course: this.state.idcourse,
                sem: this.state.cursem,
                withCredentials: true
            }).then(function (response) {
                cur.setState({isFollowed: (response.data === 1)});
            });
        }
    }
    componentDidMount() {
        let cur = this;
        axios.post('/isteacher', {
            withCredentials: true
        }).then(function (response) {
            cur.setState({isTeacher: (response.data === 1)});
        });
        this.changeSem();
        /*let response = await axios.get('courses/' + this.state.idcourse, {
            withCredentials: true
        });
        this.setState({
            coursename: response.coursename,
            semesters: response.semesters,
        }); */
        //example
    }
    deleteCourse() {

    }
    deleteSem() {

    }
    addSem() {

    }
    follow() {

    }
    unfollow() {

    }
    editTask() {

    }
    render(){
        const semesters = this.state.semesters.map((sem, index) => {
            return (<Tab eventKey={index} title={(index + 1) + ' semester'}/>);
        });

        const homeworks = this.state.semesters[this.state.cursem].homeworks.map((hw, index) => {
            return (<Task hw={hw} id={index} isTeacher={this.state.isTeacher} onEditTask={this.editTask.bind(this)}/>);
        });
        let cur = this;
        const deleteCoursePopover = (<Popover id="1">Delete course</Popover>);
        const editCoursePopover = (<Popover id="2">Edit course</Popover>);
        const deleteSemPopover = (<Popover id="3">Delete semester</Popover>);
        const addSemPopover = (<Popover id="4">Add semester</Popover>);
        const followPopover = (<Popover id="5">Follow current semester</Popover>);
        const unfollowPopover = (<Popover id="6">Unfollow current semester</Popover>);
        return (
            <Grid>
                {this.state.isTeacher ?
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={editCoursePopover}>
                        <Button onClick={this.handleShowEditCourse}><Glyphicon glyph="pencil"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteCoursePopover}>
                        <Button onClick={this.deleteCourse.bind(this)}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div> : <div/>}
                <h1>{this.state.coursename}</h1>
                <Modal show={this.state.showeditcourse} onHide={this.handleCloseEditCourse}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit course:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col sm={4}>
                                    <ControlLabel>Course name</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        name="name"
                                        type="text"
                                        value={this.state.coursename_}
                                        placeholder="Enter name"
                                        onChange={(e) => {cur.setState({coursename_: e.target.value});}}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4}>
                                    <ControlLabel>Group</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        name="link"
                                        type="text"
                                        value={this.state.group_}
                                        placeholder="Enter group"
                                        onChange={(e) => {cur.setState({group_: e.target.value});}}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmitEditCourse}>Submit</Button>
                        <Button onClick={this.handleCloseEditCourse}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {this.state.isTeacher ?
                <div className="pull-right">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={addSemPopover}>
                        <Button onClick={this.addSem.bind(this)}><Glyphicon glyph="plus"/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={deleteSemPopover}>
                        <Button onClick={this.deleteSem.bind(this)}><Glyphicon glyph="remove"/></Button>
                    </OverlayTrigger>
                </div> :
                <div className="pull-right">
                    {this.state.isFollowed ?
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={followPopover}>
                            <Button onClick={this.follow.bind(this)}><Glyphicon glyph="plus"/></Button>
                        </OverlayTrigger> :
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={unfollowPopover}>
                            <Button onClick={this.unfollow.bind(this)}><Glyphicon glyph="minus"/></Button>
                        </OverlayTrigger>
                    }
                </div>}
                <Tabs id="semesters" defaultActiveKey={this.state.cursem}
                    onSelect={(e) => {cur.setState({cursem: e}); cur.changeSem();}}
                >
                    {semesters}
                </Tabs>

                <PersonTable data={this.state.semesters[this.state.cursem]}/>

                {this.state.isTeacher ?
                <div className="text-center"><Button href="/addhw">Add homework</Button></div>
                : <div/>}
                <h3>Tasks</h3>
                {homeworks}
            </Grid>
        );
    }
}