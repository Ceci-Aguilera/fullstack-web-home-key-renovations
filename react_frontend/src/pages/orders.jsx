import React from "react";
import "../styles/Clients.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";



import axios from "axios";

export default function Orders() {


    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const orders_temp = await getOrders();
            setOrders(orders_temp.orders);
        }

        fetchOrders();
    }, [])


    return (
        <div className="clients-div">

            <h1 className="clients-title">Orders</h1>

            <div className="clients-add-div">
                        <Button href={`/create-order`} variant="secondary" className="clients-add-button">
                           + ADD New Order
                        </Button>
                    </div>

            {orders == null ? <div></div> :

                <div className="clients-list">
                    {orders.sort(function (a, b) {
                        if (a.id > b.id) {
                            return 1;
                        } else if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    }).map((order, index) => {
                        return (
                            <InputGroup key={index} className="mb-3 clients-list-element">
                                <div className="clients-list-element-div">
                                    <p className="clients-list-element-p">
                                        <span className="clients-span">{order.id}</span> <span className="order-span">{order.client.email}</span>  
                                        <span className="order-span">{order.client.phone}</span> ${order.total_cost} 
                                        <span className="clients-span-space">{order.confirmed?"Confirmed":"Not Confirmed"}</span>
                                    </p>
                                </div>
                                <Button href={`/client/${order.id}`} variant="secondary" className="clients-list-element-button">
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
    // const token = window.localStorage.getItem("token")

    const config = {
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Token ${token}`
        }
    }

    const orders_url = "/digital-warehouse/orders"


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