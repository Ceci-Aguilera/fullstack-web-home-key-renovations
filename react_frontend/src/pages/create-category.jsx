import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";

import { useNavigate } from 'react-router';
import CategoryAddForm from "../components/CreateCategoryForm";


const CreateCategory = () => {


    const navigate = useNavigate();

    const addCategory = async (body) => {
        // const token = window.localStorage.getItem("token")
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Token ${token}`
      }
    }
    
    const category_url = `/digital-warehouse/categories/`
    
    
    await axios.post(category_url, body, config).then(async(res) => {
        navigate("/categories", {replace: true})
    }).catch((error) => {
      console.log(error)
    } )
    }


  return (
    <>
      <CategoryAddForm onAdd={addCategory}/>
    </>
  );
};



export default CreateCategory;