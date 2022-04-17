import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";

import { useNavigate } from 'react-router';
import ClientAddForm from "../components/CreateClientForm";

import { useAuth } from "../context/AuthContext";

const domain = process.env.REACT_APP_BACKEND_API_URL

const CreateClient = () => {

  const {user} = useAuth();

    const navigate = useNavigate();

    const addClient = async (body) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    
    const client_url = `${domain}/digital-warehouse/clients/`
    
    
    await axios.post(client_url, body, config).then(async(res) => {
        navigate("/clients", {replace: true})
    }).catch((error) => {
    } )
    }


  return (user == null)?<div></div>:(
    <>
      <ClientAddForm onAdd={addClient}/>
    </>
  );
};



export default CreateClient;