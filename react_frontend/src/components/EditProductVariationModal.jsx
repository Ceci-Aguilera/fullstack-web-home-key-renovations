import React from "react";

import { Modal, Button, Form } from "react-bootstrap";

import "../styles/Navbar.css";


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useContextMenu } from "../context/MenuContext";

function EditProductVariationModal({ show, handleClose, index, product_variations, editProductVariation }) {

    const [amount, setAmount] = useState(1);
    const [base_pricing, setBasePricing] = useState(0);

    const addProductVariationHandler = (e) => {
        e.preventDefault();
        editProductVariation(index, amount, base_pricing);
    }

    return (product_variations == null || product_variations[index] == null) ? <div></div> : (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product_variations[index].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Pricing</Form.Label>
                    <Form.Control type="number" placeholder="0" steps="0.2" value={base_pricing} onChange={(e) => setBasePricing(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={(e) => addProductVariationHandler(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default EditProductVariationModal;