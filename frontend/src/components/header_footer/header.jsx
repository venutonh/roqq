import React, { Component } from 'react';

import { 
    UncontrolledDropdown, 
    NavLink, 
    Nav, 
    NavItem, 
    Navbar, 
    NavbarBrand, 
    DropdownItem, 
    DropdownToggle, 
    DropdownMenu } from 'reactstrap';

class Header extends Component {
    render(){
        return (
            <header className="header">
              <Navbar
                  color="light"
                  light expand
              >
                  <NavbarBrand href="/">ROQQ</NavbarBrand>
                  <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            </Navbar>
          </header>
          );
      }
  }

export default Header;