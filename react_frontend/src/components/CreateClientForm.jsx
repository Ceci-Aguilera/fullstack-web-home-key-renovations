import React from "react";

import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import "../styles/ProductDetailForm.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';



function ClientAddForm({ onAdd }) {

    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");



    const onCancelClicked = async(e) => {
        e.preventDefault();
        navigate("/clients", {replace: true})
    }
    


    const onSubmit = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            phone,
            address
        })

        await onAdd(body);
    }

    return(
        <div className="product-detail-form-div">

            <Card className="product-detail-form-card">
                <Card.Header className="product-detail-form-card-header">
                    New Client
                </Card.Header>
                <Card.Body className="product-detail-form-card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name of the Client"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name of the Client"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Email</Form.Label>
                            <Form.Control type="email" placeholder="Email of the Client"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone of the Client"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Address</Form.Label>
                            <Form.Control type="text" placeholder="Address of the Client"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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

export default ClientAddForm;