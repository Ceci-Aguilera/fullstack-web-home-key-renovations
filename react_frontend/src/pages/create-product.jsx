import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductCreateForm from "../components/ProductCreateForm";




const CreateProduct = () => {

const { addProduct } = useContextProducts()

const [categories, setCategories] = useState([]);

useEffect(() => {
    async function fetchCategories() {
        const categories_temp = await getCategories();
        setCategories(categories_temp.categories);
      }

        fetchCategories();
}, [])

  return (
    <>
      <ProductCreateForm categories={categories} onAdd={addProduct}/>
    </>
  );
};

const getCategories = async () => {
    // const token = window.localStorage.getItem("token")
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Token ${token}`
      }
    }
  
    const categories_url = "/digital-warehouse/categories"
  
  
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