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

class Menu extends React.Component {
    render() {
        const withAuth = <Nav pullRight>
                            <NavItem eventKey={1} href="/load">
                                Load solution
                            </NavItem>
                            <NavItem eventKey={1} href="/courses">
                                Courses
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} href="/profile">Edit profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.2} href="/sign_out">Logout</MenuItem>
                            </NavDropdown>
                        </Nav>;
        const withoutAuth = <Nav pullRight>
                            <NavItem eventKey={1} href="/sign_in">
                                Login
                            </NavItem>
                            <NavItem eventKey={1} href="/sign_up">
                                Register
                            </NavItem>
                        </Nav>;
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="#">HwProj</a></NavbarBrand>
                    {getCookie("gosessionid") !== undefined ? withAuth : withoutAuth}
                </Navbar>
            </div>
        );
    }
}
ReactDOM.render(<Menu />, document.getElementById('menu'));