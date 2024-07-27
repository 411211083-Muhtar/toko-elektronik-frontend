import React, { useContext } from 'react';
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css'; // mengimpor file CSS

const Navbar = () => {
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <div className="container">
        <BootstrapNavbar.Brand href="/" className="pl-3">EL - Shop</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown" className="products-dropdown">
              <div className="dropdown-menu-container">
                <div className="dropdown-column">
                  <h6 className="dropdown-header">KULKAS</h6>
                  <NavDropdown.Item as={Link} to="/product/1">Air Conditioner 1</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/2">Air Conditioner 2</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/3">Air Conditioner 3</NavDropdown.Item>
                </div>
                <div className="dropdown-column">
                  <h6 className="dropdown-header">AIR CONDITIONER</h6>
                  <NavDropdown.Item as={Link} to="/product/10">KULKAS SHARP 1 PINTU</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/5">KULKAS SHARP 2 PINTU</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/6">KULKAS SHARP TERBARU</NavDropdown.Item>
                </div>
                <div className="dropdown-column">
                  <h6 className="dropdown-header">MESIN CUCI</h6>
                  <NavDropdown.Item as={Link} to="/product/7">Mesin Cuci 1</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/8">Mesin Cuci 2</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/9">Mesin Cuci 3</NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#search">
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </Nav.Link>
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="user-nav-dropdown">
              <NavDropdown.Item as={Link} to="/sign-in">Sign In</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">Pemesanan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
