import React from "react";

import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import "../styles/Landing.css";


import { useEffect, useState } from "react";

const user = null;

function ListOfProducts({ products }) {

    const [searchTerm,setSearchTerm] = useState('')

    const [productsToDisplay, setProductsToDisplay] = useState([])

    useEffect(() => {
        setProductsToDisplay(products);
        console.log("Ups")
    }, [])

    useEffect(() => {
        setProductsToDisplay(products);
    }, [products])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm)
        setProductsToDisplay(products.filter((element) => {
            if(searchTerm == ""){
                return element;
              }
              else if(element.description.toLowerCase().includes(searchTerm.toLowerCase())){
                  console.log(element)
                return element;
              }
        }));
    }

    console.log(productsToDisplay)

    return (productsToDisplay == null) ? <div></div> : (
        <div className="landing-products-div">
            <Form className="d-flex landing-products-search-form" onSubmit={(e) => onSubmit(e)}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 landing-products-search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="warning" className="landing-products-search-button" type="submit">Search</Button>
            </Form>

            <div className="landing-products-list-div">

                {productsToDisplay.map((product, index) => {
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