import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";

import { useNavigate } from 'react-router';
import ClientAddForm from "../components/CreateClientForm";


const CreateClient = () => {


    const navigate = useNavigate();

    const addClient = async (body) => {
        // const token = window.localStorage.getItem("token")
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Token ${token}`
      }
    }
    
    const client_url = `/digital-warehouse/clients/`
    
    
    await axios.post(client_url, body, config).then(async(res) => {
        navigate("/clients", {replace: true})
    }).catch((error) => {
      console.log(error)
    } )
    }


  return (
    <>
      <ClientAddForm onAdd={addClient}/>
    </>
  );
};



export default CreateClient;