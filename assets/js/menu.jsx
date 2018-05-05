let { Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
NavbarHeader} = ReactBootstrap;

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
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
            isLogged: false
        };
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
       let response = await axios.post('/cookie', {
            withCredentials: true
        })
        console.log(response);
        await this.setStateAsync({isLogged: (response.data === 1)});
        //example
        await this.setStateAsync({data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
       }
    /*async componentDidMount() {
        let response = await axios.post('/menu', {
            withCredentials: true
        }).catch(function (error) {
            console.log(error);
        });
        this.setState({data: response.data.courses, isLogged: response.data.isLogged});
        //example
        this.setState({
            isLogged: true,
            data: [{id: 1, name: 'Hello World', teacher: 'Welcome to learning React!'}]});
    } */

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

var CurMenu = <Menu />

ReactDOM.render(CurMenu, document.getElementById('menu'));