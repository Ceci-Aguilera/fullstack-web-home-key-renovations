import React from "react";

import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import "../styles/ProductDetailForm.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';



function CategoryAddForm({ onAdd }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");



    const onCancelClicked = async(e) => {
        e.preventDefault();
        navigate("/categories", {replace: true})
    }
    


    const onSubmit = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            title,
        })

        await onAdd(body);
    }

    return(
        <div className="product-detail-form-div">

            <Card className="product-detail-form-card">
                <Card.Header className="product-detail-form-card-header">
                    New Category
                </Card.Header>
                <Card.Body className="product-detail-form-card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Title/Name</Form.Label>
                            <Form.Control type="text" placeholder="Title/Name of the Category"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>



                        <div className="product-detail-form-card-body-form-button-div">
                        <Button variant="secondary" className="product-detail-form-card-body-form-button" onClick={(e) => onCancelClicked(e)}>
                                Cancel
                            </Button>

                            <Button variant="warning" type="submit" className="product-detail-form-card-body-form-button">
                                Save Changes
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>

        </div>
    );
}

export default CategoryAddForm;