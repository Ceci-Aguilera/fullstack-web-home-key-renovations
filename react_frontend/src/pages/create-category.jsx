import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";

import { useNavigate } from 'react-router';
import CategoryAddForm from "../components/CreateCategoryForm";

import { useAuth } from "../context/AuthContext";


const domain = process.env.REACT_APP_BACKEND_API_URL


const CreateCategory = () => {

  const {user} = useAuth();


    const navigate = useNavigate();

    const addCategory = async (body) => {

      const config = {
          headers: {
              "Content-Type": "application/json",
          }
      }
    
    const category_url = `${domain}/digital-warehouse/categories/`
    
    
    await axios.post(category_url, body, config).then(async(res) => {
        navigate("/categories", {replace: true})
    }).catch((error) => {
    } )
    }


  return (user == null)?<div></div>:(
    <>
      <CategoryAddForm onAdd={addCategory}/>
    </>
  );
};



export default CreateCategory;