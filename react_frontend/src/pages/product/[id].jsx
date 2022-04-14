import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductDetailForm from "../../components/ProductDetailForm";




const ProductDetails = () => {
const {id} = useParams();

const { editProduct } = useContextProducts()

const [product, setProduct] = useState(null)

const [categories, setCategories] = useState([]);

useEffect(() => {

    async function fetchProduct(){
        const temp_product = await getProduct(id);
        console.log(temp_product.product)
        setProduct(temp_product.product);
    }

    async function fetchCategories() {
        const categories_temp = await getCategories();
        setCategories(categories_temp.categories);
      }

    if(id != null && id !== undefined){
        fetchProduct();
        fetchCategories();
    }

}, [id])

  return (product == null)? <div></div>:(
    <>
      <ProductDetailForm product={product} categories={categories} onEdit={editProduct}/>
    </>
  );
};

const getProduct = async (id) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Token ${token}`
        }
      }
    
      const product_url = `/digital-warehouse/product/${id}/`
    
    
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


export default ProductDetails;