import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ClientDetailForm from "../../components/EditClientForm";

import { useNavigate } from 'react-router';


import { useAuth } from "../../context/AuthContext";


const domain = process.env.REACT_APP_BACKEND_API_URL

const ClientDetails = () => {
const {id} = useParams();


const navigate = useNavigate();

const {user} = useAuth();

const [client, setClient] = useState(null)

useEffect(() => {

    async function fetchClient(){
        const temp_client = await getClient(id);
        setClient(temp_client.client);
    }

    if(user != null && id != null && id !== undefined){
        fetchClient();
    }

}, [id, user])


const editClient = async(e, body) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }

    const client_url = `${domain}/digital-warehouse/client/${id}/`
  
  
    await axios.put(client_url, body, config).then(async(res) => {
        navigate("/clients", {replace: true})
    }).catch((error) => {
    } )
}

const deleteClient = async(e) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
        
          const client_url = `${domain}/digital-warehouse/client/${id}/`
        
        
          await axios.delete(client_url, config).then(async(res) => {
              navigate("/clients", {replace: true})
          }).catch((error) => {
          } )
}

  return (user == null || client == null)? <div></div>:(
    <>
      <ClientDetailForm client={client} onEdit={editClient} onDelete={deleteClient}/>
    </>
  );
};

const getClient = async (id) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    
      const client_url = `${domain}/digital-warehouse/client/${id}/`
    
    
      return axios.get(client_url, config).then(async (res) => {
        const result = await res.data;
        return {
          status: "CLIENT_FOUND", client: result
        }
      }).catch((error) => {
        return {
          status: "CLIENT_NOT_FOUND", category: null
        }
      })
}



export default ClientDetails;