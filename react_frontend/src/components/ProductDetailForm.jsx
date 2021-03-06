import React from "react";

import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import "../styles/ProductDetailForm.css";


import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router';



function ProductDetailForm({ product, categories, onEdit, onDelete }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [comments, setComments] = useState("");
    const [product_category, setProductCategory] = useState("");

    useEffect(() => {
        setTitle(product.title)
        setComments(product.comments)
        setProductCategory(product.category);
    }, [product])


    const onCancelClicked = async (e) => {
        e.preventDefault();
        navigate("/", { replace: true })
    }

    const onDeleteClicked = async (e) => {
        e.preventDefault();
        await onDelete(product.id);
    }



    const onSubmit = async (e) => {
        e.preventDefault();


        const body = JSON.stringify({
            id: product.id,
            title,
            description: product.description,
            comments,
            category: product_category,
        })

        await onEdit(product.id, body);
    }

    return (product == null) ? <div></div> : (
        <div className="product-detail-form-div">

            <Card className="product-detail-form-card">
                <Card.Header className="product-detail-form-card-header">
                    {product.title}
                </Card.Header>
                <Card.Body className="product-detail-form-card-body">
                    <Form onSubmit={(e) => onSubmit(e)}>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Title/Name</Form.Label>
                            <Form.Control type="text" placeholder="Title/Name of Product"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Category</Form.Label>
                            <Form.Select aria-label="Default select example" value={product_category} onChange={(e) => setProductCategory(e.target.value)}>
                                {categories.map((cat, index) => {
                                    return (<option key={index} value={cat.id}>{cat.title}</option>);
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="product-detail-form-card-body-form-label">Comments</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder="Comments of Product"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
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

export default ProductDetailForm;