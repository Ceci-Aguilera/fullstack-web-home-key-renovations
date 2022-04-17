import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";

import { useAuth } from "../context/AuthContext";

const domain = process.env.REACT_APP_BACKEND_API_URL

const CreateProduct = () => {

const { addProduct } = useContextProducts()

const {user} = useAuth();

const [categories, setCategories] = useState([]);

useEffect(() => {
    async function fetchCategories() {
        const categories_temp = await getCategories();
        setCategories(categories_temp.categories);
      }
      if(user != null){
        fetchCategories();
      }
}, [user])

  return (
    <>
      <ProductCreateForm categories={categories} onAdd={addProduct}/>
    </>
  );
};

const getCategories = async () => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
  
    const categories_url = `${domain}/digital-warehouse/categories`
  
  
    return axios.get(categories_url, config).then(async (res) => {
      const result = await res.data;
      return {
        status: "CATEGORIES_FOUND", categories: result
      }
    }).catch((error) => {
      return {
        status: "CATEGORIES_NOT_FOUND", categories: []
      }
    })
  
  
  }


export default CreateProduct;