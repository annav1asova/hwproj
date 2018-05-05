let {Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem} = ReactBootstrap;

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

class MenuCourse extends React.Component{
    render() {
        return (
            <MenuItem key={this.props.id}  href={'courses/' + this.props.id}>{this.props.name}</MenuItem>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{id: 0, name: '', teacher: ''}],
            isLogged: null,
            isTeacher: null
        };
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
            return (<MenuCourse name={course.name} id={course.id}/>);
        });
        const withAuthTeacher = <Nav pullRight>
                            <NavDropdown title="Courses" id="basic-nav-dropdown">
                                {courses}
                                <MenuItem divider />
                                <MenuItem href="/">Add course</MenuItem>
                                <MenuItem href="/courses">All courses</MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <MenuItem href="/profile">Edit profile</MenuItem>
                                <MenuItem href="/">Invite another teacher</MenuItem>
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
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    {this.state.isLogged ? (this.state.isTeacher ? withAuthTeacher : withAuth) : withoutAuth}
                </Navbar>
            </div>
        );
    }
}

var CurMenu = <Menu />

ReactDOM.render(CurMenu, document.getElementById('menu'));