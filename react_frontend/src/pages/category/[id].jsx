import React from "react";
import {useParams} from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ProductDetailForm from "../../components/ProductDetailForm";
import CategoryDetailForm from "../../components/EditCategoryForm";

import { useNavigate } from 'react-router';
import { useAuth } from "../../context/AuthContext";


const domain = process.env.REACT_APP_BACKEND_API_URL

const CategoryDetails = () => {
const {id} = useParams();

const {user} = useAuth();


const navigate = useNavigate();

const [category, setCategory] = useState(null)

useEffect(() => {

    async function fetchCategory(){
        const temp_category = await getCategory(id);
        setCategory(temp_category.category);
    }

    if(user != null && id != null && id !== undefined){
        fetchCategory();
    }

}, [id, user])


const editCategory = async(e, body) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
  
    const category_url = `${domain}/digital-warehouse/category/${id}/`
  
  
    await axios.put(category_url, body, config).then(async(res) => {
        navigate("/categories", {replace: true})
    }).catch((error) => {
    } )
}

const deleteCategory = async(e) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
        
          const category_url = `${domain}/digital-warehouse/category/${id}/`
        
        
          await axios.delete(category_url, config).then(async(res) => {
              navigate("/categories", {replace: true})
          }).catch((error) => {
          } )
}

  return (category == null)? <div></div>:(
    <>
      <CategoryDetailForm category={category} onEdit={editCategory} onDelete={deleteCategory}/>
    </>
  );
};

const getCategory = async (id) => {

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
    
      const category_url = `${domain}/digital-warehouse/category/${id}/`
    
    
      return axios.get(category_url, config).then(async (res) => {
        const result = await res.data;
        return {
          status: "CATEGORY_FOUND", category: result
        }
      }).catch((error) => {
        return {
          status: "CATEGORY_NOT_FOUND", category: null
        }
      })
}



export default CategoryDetails;