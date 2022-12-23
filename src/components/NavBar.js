import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUserAction } from '../redux/auths/usersReducer';
import { msgAction } from '../redux/msgHandler/msgReducer';

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    localStorage.removeItem('user');
    try {
      await axios.post('https://booooka-api.onrender.com/api/v1/auths/logout', { withCredentials: true });
      dispatch(getUserAction.getUser(null));
      dispatch(msgAction.getSuccessMsg('User signed out successfully'));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleReservation = () => {
    if (!user) {
      navigate('/signin');
    }
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#943d24' }} data-testid="nav-bar">
      <Container>
        <Navbar.Brand href="/">BOOooKa.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/">Home</NavLink>
            <NavLink className="text-white text-decoration-none text-center py-2 mx-2" to="/reservations" onClick={handleReservation}>Reservations</NavLink>
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
