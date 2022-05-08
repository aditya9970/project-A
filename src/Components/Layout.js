import React, { useEffect, useState } from "react";
import TmdbIcon from "./../TMDB.png";
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
import LoginComponent from "./LoginComponent";

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <div>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">Recom</NavbarBrand>
        <NavbarToggler onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        <Collapse navbar isOpen={isNavbarOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/movies/">Movies</NavLink>
            </NavItem>
            {isLoggedIn && (
              <NavItem>
                <NavLink href="/user/">My Reviews</NavLink>
              </NavItem>
            )}
            <NavItem>
              <LoginComponent
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="py-5 border-top">
      <div className="text-center">
        <div className="mx-2">Movie Data in Presented By</div>
        <a href="https://www.themoviedb.org/">
          <img
            className="w-25 my-2"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          />
        </a>
      </div>
    </div>
  );
};
