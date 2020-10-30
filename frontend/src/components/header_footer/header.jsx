import React, { Component } from 'react';
import './header.css';

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
                  className="nav"
                  // style={{
                  //   //backgroundImage: 'linear-gradient(to right,  yellow, green)',
                  //  // backgroundImage: 'linear-gradient(red, yellow, green)',
                  //  background: 
                  //  'linear-gradient(to right, rgba(66,255,0,.5) 60%, rgba(18,118,0,.5) 40%), linear-gradient(to bottom, rgba(208,118,200,.5) 0%, rgba(218,118,200,.5) 100%) '
                  // }}
                  //color='#6BF643'
                  dark expand
              >
                  <NavbarBrand href="/" className="headstone">ROQQ</NavbarBrand>
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