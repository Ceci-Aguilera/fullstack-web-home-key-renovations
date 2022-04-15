import React from "react";

import { Modal, Button, Form } from "react-bootstrap";

import "../styles/Navbar.css";


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useContextMenu } from "../context/MenuContext";

function CreateProductVariationModal({ show, handleClose, item, addProductVariation }) {

    const [amount, setAmount] = useState(1);

    const addProductVariationHandler = (e) => {
        e.preventDefault();
        addProductVariation(item, amount);
    }

    return (item == null) ? <div></div> : (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => addProductVariationHandler(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default CreateProductVariationModal;