import React from "react";
import "../styles/Orders.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_API_URL

export default function Orders() {

    const {user} = useAuth();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const orders_temp = await getOrders();
            setOrders(orders_temp.orders);
        }

        if(user != null){
            fetchOrders();
        }
    }, [user])


    return (
        <div className="clients-div">

            <h1 className="clients-title">Orders</h1>

            <div className="clients-add-div">
                        <Button href={`/create-order`} variant="secondary" className="clients-add-button">
                           + ADD New Order
                        </Button>
                    </div>

            {orders == null ? <div></div> :

                <div className="order-list">
                    {orders.sort(function (a, b) {
                        if (a.id > b.id) {
                            return 1;
                        } else if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    }).map((order, index) => {
                        return (
                            <InputGroup key={index} className="mb-3 order-list-element">
                                <div className="order-list-element-div">
                                    <p className="clients-list-element-p">
                                        <span className="clients-span">{order.id}</span> <span className="order-span">{order.client.email}</span>  
                                        <span className="order-span">{order.client.phone}</span> 
                                        <span className="order-span">{order.scale}</span>
                                        <span className="order-span">${order.total_cost}</span>
                                        <span className="clients-span-space">{order.confirmed?"Confirmed":"Not Confirmed"}</span>
                                    </p>
                                </div>
                                <Button href={`/order/${order.id}`} variant="secondary" className="clients-list-element-button">
                                    Edit
                                </Button>
                            </InputGroup>
                        );
                    })}

                </div>
            }

        </div>
    );
}

const getOrders = async () => {


    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const orders_url = `${domain}/digital-warehouse/orders`


    return axios.get(orders_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "ORDERS_FOUND", orders: result
        }
    }).catch((error) => {
        return {
            status: "ORDERS_NOT_FOUND", orders: []
        }
    })


}