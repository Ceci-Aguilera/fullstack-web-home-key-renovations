import React from "react";
import "../styles/Landing.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListOfProducts from "../components/ListOfProfucts";

import {useContextProducts} from "../context/ProductsContext";

export default function Landing() {

  const {products} = useContextProducts()

  // useEffect(() => {
  //   setProducts([{name:"Ventana de Madera ", description:"Ventana de Madera 20'' x 30''"}, {name:"Puerta de Madera", description:"Puerta de Madera 20'' x 30''"}])
  // }, [])


  console.log(products)
  


  return (
    <div className="landing-div">

      <Row className="landing-row">
        <Col xs={12} sm={12} md={12} lg={4}>
          <div className="landing-categories-div">
            <h2 className="landing-categories-h2">
              Categories
            </h2>

            <div className="landing-categories-list-div">
              <div className="landing-categories-list-element-div">
                <p className="landing-categories-list-element-p">
                  ALL
                </p>
              </div>

              <div className="landing-categories-list-element-div landing-categories-list-element-selected">
                <p className="landing-categories-list-element-p">
                  Category 1
                </p>
              </div>

              <div className="landing-categories-list-element-div">
                <p className="landing-categories-list-element-p">
                  Category 2
                </p>
              </div>


            </div>
          </div>

        </Col>

        <Col xs={12} sm={12} md={12} lg={8}>
         
         <ListOfProducts products={products}/>


        </Col>
      </Row>

    </div>
  );
}