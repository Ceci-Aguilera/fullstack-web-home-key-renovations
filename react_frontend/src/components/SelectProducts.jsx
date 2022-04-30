import React from "react";

import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import "../styles/Landing.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function SelectProducts({ products, onAddItem }) {

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

    const onAddItemHandler = (e, item) => {
        e.preventDefault();
        onAddItem(item)
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

            {(productsToDisplay == null) ? <div></div> : (

                    <div className="landing-products-list-div">

                        {productsToDisplay.map((product, index) => {
                            return (
                                <InputGroup key={index} className="mb-3 landing-products-list-element-input-group">
                                    <div className="landing-products-list-element-div">
                                        <p className="landing-products-list-element-p">
                                            {product.title} {product.comments}
                                        </p>
                                    </div>
                                    <Button variant="secondary" className="landing-products-list-element-button" onClick={(e) => onAddItemHandler(e, product)}>
                                        Add
                                    </Button>
                                </InputGroup>);
                        })}


                    </div>
            )}
                </div>

        </div>
    );
}

export default SelectProducts;