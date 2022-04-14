import React from "react";

import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import "../styles/ProductDetailForm.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';



function ClientDetailForm({client, onEdit, onDelete }) {

    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        setFirstName(client.first_name)
        setLastName(client.last_name)
        setEmail(client.email)
        setPhone(client.phone)
        setAddress(client.address)
    }, [client])


    const onCancelClicked = async (e) => {
        e.preventDefault();
        navigate("/clients", { replace: true })
    }

    const onDeleteClicked = async (e) => {
        e.preventDefault();
        await onDelete(client.id);
    }



    const onSubmit = async (e) => {
        e.preventDefault();


        const body = JSON.stringify({
            id: client.id,
            first_name,
            last_name,
            email,
            phone,
            address
        })

        await onEdit(client.id, body);
    }

    return (client == null) ? <div></div> : (
        <div className="product-detail-form-div">

            <Card className="product-detail-form-card">
                <Card.Header className="product-detail-form-card-header">
                    {client.first_name} {client.last_name}
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

                            <Button variant="danger" className="product-detail-form-card-body-form-button" onClick={(e) => onDeleteClicked(e)}>
                                Delete
                            </Button>

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

export default ClientDetailForm;