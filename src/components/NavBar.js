import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AccountCircle from '@mui/icons-material/AccountCircle';
import getUser from '../redux/auths/usersAction';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    localStorage.removeItem('user');

    dispatch(getUser(null));
    try {
      await axios.post('http://localhost:5000/api/v1/auths/logout', { withCredentials: true });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">BOOooKa.com</Navbar.Brand>
        <AccountCircle />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/">Home</NavLink>
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/reservations">Reservations</NavLink>
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/createhotel">Add Hotel</NavLink>
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/createroom">Add Room</NavLink>
            {!user
              ? (
                <>
                  <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/SignUp">Sign Up</NavLink>
                  <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/SignIn">Sign In</NavLink>
                </>
              )
              : (
                <>

                  <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/" onClick={handleSignOut}>Sign Out</NavLink>
                </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
