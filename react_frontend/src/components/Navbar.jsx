import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import "../styles/Navbar.css";


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {useContextMenu} from "../context/MenuContext";
// import {useAuth} from "../context/AuthContext";

const user = null;

function CustomNavbar() {

  const {current_link, setCurrentLinkHelper} = useContextMenu();
//   const {user, login, logout} = useAuth();

  useEffect(() => {
    // console.log(current_link);
  }, [current_link])

  return (
    <Navbar bg="dark" variant="dark" className="navbar" collapseOnSelect expand="lg">
      {/* <Container className="navbar-div"> */}
        <Navbar.Brand exact to="/"
              as={NavLink} className="navbar-brand">
          {/* <img
            src={logo}
            width="100%"
            height="80"
            className="d-inline-block align-top navbar-brand-img"
            alt="React Bootstrap logo"
            onClick={()=>setCurrentLinkHelper("Home")}
          /> */}
         Home Key Renovations
        </Navbar.Brand>
        <Navbar.Toggle  className="navbar-toggle" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navbar-nav">

            <Nav.Link
              exact to="/categories"
              as={NavLink}
              className="navbar-link"
            >
              <span onClick={()=>setCurrentLinkHelper("Categories")} className={current_link=="Categories"?"secondary-color-span":""}>Categories</span>
            </Nav.Link>

            <Nav.Link exact to="/" as={NavLink}  className="navbar-link">
              <span onClick={()=>setCurrentLinkHelper("Products")} className={current_link=="Products"?"secondary-color-span":""}>Products</span>
            </Nav.Link>

            <Nav.Link exact to="/clients" as={NavLink}  className="navbar-link">
              <span onClick={()=>setCurrentLinkHelper("Clients")} className={current_link=="Clients"?"secondary-color-span":""}>Clients</span>
            </Nav.Link>

            <Nav.Link exact to="/orders" as={NavLink}  className="navbar-link">
              <span onClick={()=>setCurrentLinkHelper("Orders")} className={current_link=="Orders"?"secondary-color-span":""}>Orders</span>
            </Nav.Link>

            {user?
              <Nav.Link exact to="/#" as={NavLink}  className="navbar-link">
                <span onClick={()=>setCurrentLinkHelper("Logout")} className={current_link=="Logout"?"secondary-color-span":""}>Logout</span>
              </Nav.Link>
            :""}

          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default CustomNavbar;