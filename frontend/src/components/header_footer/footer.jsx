import React, { Component } from 'react';

import { Navbar, NavItem, NavLink } from 'reactstrap'

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div>
                    <Navbar
                        color="light"
                        light expand
                    >
                        
                    <NavLink href="/components/">Home</NavLink>
                    
                    
                    <NavLink href="https://github.com/reactstrap/reactstrap">About Us</NavLink>


                    <NavLink href="https://github.com/reactstrap/reactstrap">Suggestion Box</NavLink>
                    
                    
                    <NavLink href="https://github.com/reactstrap/reactstrap">Donate</NavLink>


                    <NavItem>
                        Copyright of Rate On Queue Quality (ROQQ) 2020
                    </NavItem>
                    </Navbar>
                    </div>
            </footer>
                )
            }
        }

export default Footer;