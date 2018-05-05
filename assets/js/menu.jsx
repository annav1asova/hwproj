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
            <MenuItem href={'courses/' + this.props.id}>{this.props.name}</MenuItem>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{id: 0, name: '', teacher: ''}],
            isLogged: false,
            isTeacher: false
        };
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentWillMount() {
        let response = await axios.post('/islogged', {
            withCredentials: true
        });
        await this.setStateAsync({isLogged: (response.data === 1)});
        response = await axios.post('/isteacher', {
            withCredentials: true
        });
        await this.setStateAsync({isTeacher: (response.data === 1)});
        /*response = await axios.post('/menu', {
            withCredentials: true
        });
        this.setState({data: response.data}); */
        //example
        await this.setStateAsync({data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
        this.render();
    }

    render() {
        const courses = this.state.data.map((course, index) => {
            return (<MenuCourse name={course.name} id={course.id}/>);
        });
        const withAuth = <Nav pullRight>
                            <NavItem href="/load">
                                Load solution
                            </NavItem>
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
                    {this.state.isLogged? withAuth : withoutAuth}
                </Navbar>
            </div>
        );
    }
}

let CurMenu = <Menu />

ReactDOM.render(CurMenu, document.getElementById('menu'));