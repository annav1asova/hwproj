import { Nav, Navbar, NavbarBrand, NavItem } from 'react-bootstrap';
import React from 'react';

export class DefaultMenu extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse>
                    <NavbarBrand><a href="/">HwProj</a></NavbarBrand>
                    <Nav pullRight>
                        <NavItem href="/sign_in_in">
                            Login
                        </NavItem>
                        <NavItem href="/sign_up">
                            Register
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}