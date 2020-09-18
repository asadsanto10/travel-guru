import React, { useContext } from 'react';
import {Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../Image/Logo-white.png'
import './Header.scss'
const Header = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    return (
        <div id="navbar">
            <Container>
                <Navbar expand="lg">
                    <Navbar.Brand href="/home/">
                        <img src={Logo} alt=""/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>News</Nav.Link>
                            <Nav.Link>Destination</Nav.Link>
                            <Nav.Link>Blog</Nav.Link>
                            <Nav.Link>Contact</Nav.Link>
                            {
                                !loggedinUser.email && <Nav.Link href="/login" className="btn btn-warning">Log in</Nav.Link>
                            }
                            {
                                loggedinUser.email && <Nav.Link className="btn btn-warning" onClick={() => setLoggedinUser({})}>Sign out</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
};

export default Header;