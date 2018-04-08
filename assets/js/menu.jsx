let { Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,} = ReactBootstrap;

class Menu extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse expand="md">
                    <NavbarBrand>HwProj</NavbarBrand>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/load">
                            Load solution
                        </NavItem>
                        <NavItem eventKey={1} href="/courses">
                            Courses
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/profile">Edit profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.2} href="/sign">Login/Logout</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
ReactDOM.render(<Menu />, document.getElementById('menu'));