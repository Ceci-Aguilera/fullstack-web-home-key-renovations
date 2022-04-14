import React from "react";

import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import "../styles/Landing.css";


import { useEffect, useState } from "react";

const user = null;

function ListOfProducts({ products }) {

    return (products == null) ? <div></div> : (
        <div className="landing-products-div">
            <Form className="d-flex landing-products-search-form">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 landing-products-search"
                    aria-label="Search"
                />
                <Button variant="warning" className="landing-products-search-button">Search</Button>
            </Form>

            <div className="landing-products-list-div">

                {products.map((product, index) => {
                    return (
                        <InputGroup key={index} className="mb-3 landing-products-list-element-input-group">
                            <div className="landing-products-list-element-div">
                                <p className="landing-products-list-element-p">
                                    {product.description}
                                </p>
                            </div>
                            <Button variant="secondary" className="landing-products-list-element-button">
                                Edit
                            </Button>
                        </InputGroup>);
                })}


            </div>

        </div>
    );
}

export default ListOfProducts;