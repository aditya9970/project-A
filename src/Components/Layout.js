import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarText,
} from "reactstrap";

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <div>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        <Collapse navbar isOpen={isNavbarOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/movies/">Movies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login/">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
