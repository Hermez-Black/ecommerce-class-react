import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartSideBar from './CartSideBar';

export default function NavBar() {
  const [show, setShow] = useState(false);
  const hasToken = () => {
    const token = localStorage.getItem("token") || null;
    return token ? true : false;
  }

  const logout = () => {
    localStorage.clear();
  }

  const handleClose = () => {
    setShow(false);
  }
  return (
    <>
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={ Link } to="/">ECOMMERCE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={ Link } to="/">Home</Nav.Link>
            <Nav.Link as={ Link } to="/purchases">Purchases</Nav.Link>
            <Nav.Link onClick={() => setShow(true)}>Cart</Nav.Link>
            <Nav.Link as={ Link } to="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <CartSideBar title={'Carrito de compras'} show={show} handleClose={handleClose}/>
    </>
  )
}
