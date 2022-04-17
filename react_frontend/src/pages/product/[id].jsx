import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductDetailForm from "../../components/ProductDetailForm";

import { useAuth } from "../../context/AuthContext";


const domain = process.env.REACT_APP_BACKEND_API_URL

const ProductDetails = () => {
const {id} = useParams();

const {user} = useAuth();

const { editProduct, deleteProduct } = useContextProducts()

const [product, setProduct] = useState(null)

const [categories, setCategories] = useState([]);

useEffect(() => {

    async function fetchProduct(){
        const temp_product = await getProduct(id);
        setProduct(temp_product.product);
    }

    async function fetchCategories() {
        const categories_temp = await getCategories();
        setCategories(categories_temp.categories);
      }

    if(user != null && id != null && id !== undefined){
        fetchProduct();
        fetchCategories();
    }

}, [id, user])

  return (product == null)? <div></div>:(
    <>
      <ProductDetailForm product={product} categories={categories} onEdit={editProduct} onDelete={deleteProduct}/>
    </>
  );
};

const getProduct = async (id) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
    
      const product_url = `${domain}/digital-warehouse/product/${id}/`
    
    
      return axios.get(product_url, config).then(async (res) => {
        const result = await res.data;
        return {
          status: "PRODUCT_FOUND", product: result
        }
      }).catch((error) => {
        return {
          status: "PRODUCT_NOT_FOUND", product: null
        }
      })
}


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


export default ProductDetails;