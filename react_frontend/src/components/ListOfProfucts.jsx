import React from "react";

import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import "../styles/Landing.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function ListOfProducts({ products }) {

    const [searchTerm, setSearchTerm] = useState('')

    const [productsToDisplay, setProductsToDisplay] = useState([])

    useEffect(() => {
        setProductsToDisplay(products);
    }, [])

    useEffect(() => {
        setProductsToDisplay(products);
    }, [products])

    const onSubmit = (e) => {
        e.preventDefault();
        setProductsToDisplay(products.filter((element) => {
            if (searchTerm == "") {
                return element;
            }
            else if (element.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                return element;
            }
        }));
    }


    return (
        <div className="landing-products-div">

                <div>
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

                    <div className="landing-products-add-div">
                        <Button href={`/create-product`} variant="secondary" className="landing-products-add-button">
                           + ADD New Product
                        </Button>
                    </div>
            {(productsToDisplay == null) ? <div></div> : (

                    <div className="landing-products-list-div">

                        {productsToDisplay.map((product, index) => {
                            return (
                                <InputGroup key={index} className="mb-3 landing-products-list-element-input-group">
                                    <div className="landing-products-list-element-div">
                                        <p className="landing-products-list-element-p">
                                            {product.title} {product.height}'' x {product.width}'' cost ${product.pricing}
                                        </p>
                                    </div>
                                    <Button href={`/products/${product.id}`} variant="secondary" className="landing-products-list-element-button">
                                        Edit
                                    </Button>
                                </InputGroup>);
                        })}


                    </div>
            )}
                </div>

        </div>
    );
}

export default ListOfProducts;