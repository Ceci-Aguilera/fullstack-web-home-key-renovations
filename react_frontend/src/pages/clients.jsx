import React from "react";
import "../styles/Clients.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_API_URL

export default function Clients() {

    const {user} = useAuth();


    const [clients, setClients] = useState([]);

    const [searchTerm, setSearchTerm] = useState('')

    const [clientsToDisplay, setClientsToDisplay] = useState([])


    useEffect(() => {
        async function fetchClients() {
            const clients_temp = await getClients();
            setClients(clients_temp.clients);
        }

        if(user != null){
            fetchClients();
            setClientsToDisplay(clients)
        }
    }, [user])

    useEffect(() => {
        setClientsToDisplay(clients);
    }, [clients])

    const onSubmit = (e) => {
        e.preventDefault();
        setClientsToDisplay(clients.filter((element) => {
            if (searchTerm == "") {
                return element;
            }
            else if (element.email.toLowerCase().includes(searchTerm.toLowerCase()) || element.phone.toLowerCase().includes(searchTerm.toLowerCase())) {
                return element;
            }
        }));
    }


    return (
        <div className="clients-div">

            <h1 className="clients-title">Clients</h1>

            <Form className="d-flex clients-search-form" onSubmit={(e) => onSubmit(e)}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 clients-search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="warning" className="clients-search-button" type="submit">Search</Button>
                    </Form>


            <div className="clients-add-div">
                        <Button href={`/create-client`} variant="secondary" className="clients-add-button">
                           + ADD New Client
                        </Button>
                    </div>

            {clients == null ? <div></div> :

                <div className="clients-list">
               

                    {clientsToDisplay.sort(function (a, b) {
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
                                        <span className="clients-span">{client.first_name} {client.last_name}</span> {client.email} <span className="clients-span-space">{client.phone}</span>
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

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const clients_url = `${domain}/digital-warehouse/clients/`


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