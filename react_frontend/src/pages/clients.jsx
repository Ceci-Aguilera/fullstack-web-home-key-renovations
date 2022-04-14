import React from "react";
import "../styles/Clients.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";



import axios from "axios";

export default function Clients() {


    const [clients, setClients] = useState([]);

    useEffect(() => {
        console.log("Cat")
        async function fetchCategories() {
            const clients_temp = await getClients();
            setClients(clients_temp.clients);
        }

        fetchCategories();
    }, [])


    return (
        <div className="clients-div">

            <h1 className="clients-title">Categories</h1>

            <div className="clients-add-div">
                        <Button href={`/create-client`} variant="secondary" className="clients-add-button">
                           + ADD New Category
                        </Button>
                    </div>

            {clients == null ? <div></div> :

                <div className="clients-list">
                    {clients.sort(function (a, b) {
                        if (a.first_name > b.first_name) {
                            return 1;
                        } else if (a.first_name < b.first_name) {
                            return -1;
                        }
                        return 0;
                    }).map((client, index) => {
                        return (
                            <InputGroup key={index} className="mb-3 clients-list-element">
                                <div className="clients-list-element-div">
                                    <p className="clients-list-element-p">
                                        <span className="clients-span">{client.first_name} {client.last_name}</span> {client.email} {client.phone}
                                    </p>
                                </div>
                                <Button href={`/client/${client.id}`} variant="secondary" className="clients-list-element-button">
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

const getClients = async () => {
    // const token = window.localStorage.getItem("token")

    const config = {
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Token ${token}`
        }
    }

    const clients_url = "/digital-warehouse/clients"


    return axios.get(clients_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "CLIENTS_FOUND", clients: result
        }
    }).catch((error) => {
        return {
            status: "CLIENTS_NOT_FOUND", clients: []
        }
    })


}