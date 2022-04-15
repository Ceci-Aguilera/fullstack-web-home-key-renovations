import { Row, Col, Container } from "react-bootstrap";

import "../styles/Footer.css";
import { Link } from "react-router-dom";


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {useContextMenu} from "../context/MenuContext";
// import {useAuth} from "../context/AuthContext";

function Footer() {

const {current_link, setCurrentLinkHelper} = useContextMenu();

    const user = null;

    useEffect(() => {
    // console.log(current_link);
  }, [current_link])



  return (
    <footer className="footer">
      <Container className="footer-div">
        <Row className="footer-nav-row">
          <div className="footer-nav">

            <Link exact to="/categories"
              as={NavLink} className="footer-link">
              <span onClick={()=>setCurrentLinkHelper("Categories")} className={current_link=="Categories"?"secondary-color-span":""}>Categories</span>
            </Link>

            <Link exact to="/"
              as={NavLink}  className="footer-link">
              <span onClick={()=>setCurrentLinkHelper("Products")} className={current_link=="Products"?"secondary-color-span":""}>Products</span>
            </Link>


            <Link exact to="/clients" as={NavLink}  className="footer-link">
            <span onClick={()=>setCurrentLinkHelper("Clients")} className={current_link=="Clients"?"secondary-color-span":""}>Clients</span>
            </Link>

            <Link exact to="/orders" as={NavLink}  className="footer-link">
            <span onClick={()=>setCurrentLinkHelper("Orders")} className={current_link=="Orders"?"secondary-color-span":""}>Orders</span>
            </Link>

            {user?
              <Link exact to="/#" as={NavLink}  className="footer-link">
                <span onClick={()=>setCurrentLinkHelper("Logout")} className={current_link=="Logout"?"secondary-color-span":""}>Logout</span>
              </Link>
            :""}


          </div>
        </Row>



        <Row className="footer-space-row">
          <div className="footer-space-div" />
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;