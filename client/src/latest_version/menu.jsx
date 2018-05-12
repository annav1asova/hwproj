let {Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
    Col,} = ReactBootstrap;

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

class MenuCourse extends React.Component{
    render() {
        return (
            <MenuItem key={this.props.index}  href={'courses/' + this.props.id}>{this.props.name}</MenuItem>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{id: 0, name: '', teacher: ''}],
            isLogged: null,
            isTeacher: null,
            showaddcourse: false,
            coursename: "",
            group: "",
            showadduser: false,
            email: ""
        };

        this.handleShowAddCourse = this.handleShowAddCourse.bind(this);
        this.handleCloseAddCourse = this.handleCloseAddCourse.bind(this);
        this.handleSubmitAddCourse = this.handleCloseAddCourse.bind(this);
        this.handleShowAddUser = this.handleShowAddUser.bind(this);
        this.handleCloseAddUser = this.handleCloseAddUser.bind(this);
        this.handleSubmitAddUser = this.handleCloseAddUser.bind(this);
    }

    handleSubmitAddCourse() {
        axios.post('/addcourse', {
            name: this.state.coursename,
            group: this.state.group,
            withCredentials: true
        });
        this.setState({ showaddcourse: false, coursename:"",group:0 });
    }
    handleCloseAddCourse() {
        this.setState({ showaddcourse: false, coursename:"",group:0 });
    }
    handleShowAddCourse() {
        this.setState({ showaddcourse: true });
    }
    handleSubmitAddUser() {
        //something about sending invitation??
        this.setState({ showadduser: false, email: "" });
    }
    handleCloseAddUser() {
        this.setState({ showadduser: false, email: "" });
    }
    handleShowAddUser() {
        this.setState({ showadduser: true });
    }
    componentDidMount() {
        let cur = this;
        axios.post('/islogged', {
            withCredentials: true
        }).then(function (response) {
            cur.setState({isLogged: (response.data === 1)});
        });
        axios.post('/isteacher', {
            withCredentials: true
        }).then(function (response) {
            cur.setState({isTeacher: (response.data === 1)});
        });
        /*let response3 = await axios.post('/menu', {
            withCredentials: true
        });
        this.setState({data: response.data}); */
        //example
        this.setState({data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
    }

    render() {
        if (this.state.isLogged === null)
            return (
                <div>
                    <Navbar inverse>
                        <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    </Navbar>
                </div>
            );
        const courses = this.state.data.map((course, index) => {
            return (<MenuCourse index={index} name={course.name} id={course.id}/>);
        });
        const withAuthTeacher = <Nav pullRight>
                            <NavDropdown title="Courses" id="basic-nav-dropdown">
                                {courses}
                                <MenuItem divider />
                                <MenuItem onClick={this.handleShowAddCourse}>Add course</MenuItem>
                                <MenuItem href="/courses">All courses</MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <MenuItem href="/profile">Edit profile</MenuItem>
                                <MenuItem onClick={this.handleShowAddUser}>Invite another teacher</MenuItem>
                                <MenuItem divider />
                                <MenuItem href="/sign_out">Logout</MenuItem>
                            </NavDropdown>
                        </Nav>;
        const withAuth = <Nav pullRight>
                            <NavDropdown title="Courses" id="basic-nav-dropdown">
                                {courses}
                                <MenuItem divider />
                                <MenuItem href="/courses">All courses</MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <MenuItem href="/profile">Edit profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem href="/sign_out">Logout</MenuItem>
                            </NavDropdown>
                        </Nav>;
        const withoutAuth = <Nav pullRight>
                            <NavItem href="/sign_in">
                                Login
                            </NavItem>
                            <NavItem eventKey={1} href="/sign_up">
                                Register
                            </NavItem>
                        </Nav>;
        let cur = this;
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    {this.state.isLogged ? (this.state.isTeacher ? withAuthTeacher : withAuth) : withoutAuth}
                </Navbar>
                <Modal show={this.state.showaddcourse} onHide={this.handleCloseAddCourse}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add course:</Modal.Title>
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
                                        value={this.state.coursename}
                                        placeholder="Enter name"
                                        onChange={(e) => {cur.setState({coursename: e.target.value});}}/>
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
                                        value={this.state.group}
                                        placeholder="Enter group"
                                        onChange={(e) => {cur.setState({group: e.target.value});}}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmitAddCourse}>Submit</Button>
                        <Button onClick={this.handleCloseAddCourse}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showadduser} onHide={this.handleCloseAddUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite another teacher:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col sm={4}>
                                    <ControlLabel>Email adress</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        name="email"
                                        type="text"
                                        value={this.state.email}
                                        placeholder="Enter email"
                                        onChange={(e) => {cur.setState({email: e.target.value});}}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmitAddUser}>Submit</Button>
                        <Button onClick={this.handleCloseAddUser}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

var CurMenu = <Menu />

ReactDOM.render(CurMenu, document.getElementById('menu'));