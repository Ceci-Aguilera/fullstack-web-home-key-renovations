import React from "react";

import { useEffect, useState, useRef } from "react";

import { Card, Button, Container, Form, Row, Col } from "react-bootstrap";

import "../styles/PrintOrder.css";


import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom"

class OrderToPrint extends React.Component {

    render() {

        return (
            <div className="order-to-print-div">

                <h1 className="order-to-print-title order-to-print-title-h1">
                    Home Key Renovation
                </h1>

                <p className="order-to-print-client-p">
                <span className="order-to-print-client-p-span">Phone:</span>  941-580-0738
                </p>

                <h2 className="order-to-print-title order-to-print-title-h2">
                    ORDER #{this.props.order.id}
                </h2>

                <p className="order-to-print-client-p">

                    <span className="order-to-print-client-p-span">Client:</span> {this.props.order.client.first_name} {this.props.order.client.last_name}

                </p>

                <h2 className="order-to-print-mat-title">
                    Materials & Cost Estimate
                </h2>

                <ul>
                    {this.props.product_variations.map((prod_var, index) => {
                        return (
                            <li key={index}>
                                <Row>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        {prod_var.product.comments} {prod_var.product.title}
                                    </Col>

                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        {prod_var.amount} x ${parseFloat(prod_var.pricing / prod_var.amount).toFixed(2)}
                                    </Col>

                                    <Col xs={1} sm={1} md={1} lg={1}>
                                        ${parseFloat(prod_var.pricing).toFixed(2)}
                                    </Col>
                                </Row>
                            </li>
                        );
                    })}

                    <li>
                        <Row>
                            <Col xs={8} sm={8} md={8} lg={8}>
                                <span className="order-to-print-client-p-span"> Total Materials' Cost (0.07 tax): </span>
                            </Col>

                            <Col xs={3} sm={3} md={3} lg={3}>
                            </Col>

                            <Col xs={1} sm={1} md={1} lg={1}>
                                <span className="order-to-print-client-p-span"> ${parseFloat(calculateTaxes(this.props.product_variations)).toFixed(2)} </span>
                            </Col>
                        </Row>
                    </li>

                    <li>
                        <Row>
                            <Col xs={8} sm={8} md={8} lg={8}>
                                <span className="order-to-print-client-p-span"> Labor: </span>
                            </Col>

                            <Col xs={3} sm={3} md={3} lg={3}>
                            </Col>

                            <Col xs={1} sm={1} md={1} lg={1}>
                                <span className="order-to-print-client-p-span"> ${this.props.order.bill_for_service}</span>
                            </Col>
                        </Row>
                    </li>

                    <li>
                        <Row>
                            <Col xs={8} sm={8} md={8} lg={8}>
                                <span className="order-to-print-client-p-span"> Total Cost: </span>
                            </Col>

                            <Col xs={3} sm={3} md={3} lg={3}>
                            </Col>

                            <Col xs={1} sm={1} md={1} lg={1}>
                                <span className="order-to-print-client-p-span">
                                    ${parseFloat(this.props.order.bill_for_service + calculateTaxes(this.props.product_variations)).toFixed(2)}
                                </span>
                            </Col>
                        </Row>
                    </li>

                </ul>
            </div >
        );
    }
}




const calculateTaxes = (items) => {
    var total_taxes = 0;
    for (let i = 0; i < items.length; i++) {
        total_taxes += (items[i].pricing)
    }
    return total_taxes + (total_taxes * 0.07);
}



export default OrderToPrint;