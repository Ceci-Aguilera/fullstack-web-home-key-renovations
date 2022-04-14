import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

import axios from "axios";


import { useNavigate } from 'react-router';

const getProducts = async() => {

  // const token = window.localStorage.getItem("token")

  const config = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Token ${token}`
    }
  }

  const products_url = "/digital-warehouse/products"


  return axios.get(products_url, config).then(async(res) => {
    const result = await res.data;
    return {
      status: "PRODUCTS_FOUND", products: result 
    }
  }).catch((error) => {
    return {
      status: "PRODUCTS_NOT_FOUND", products: [] 
    }
  } )


}





const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {

  const [products, setProduct] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const products_res = await getProducts();
      setProduct(products_res.products);
    }
    
    fetchProducts();
  }, [])


  const editProduct = async (id, body) => {
      // const token = window.localStorage.getItem("token")

  const config = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Token ${token}`
    }
  }

  const product_url = `/digital-warehouse/product/${id}/`

  console.log(body);


  await axios.put(product_url, body, config).then(async(res) => {
    const products_res = await getProducts();
    setProduct(products_res.products);
  }).catch((error) => {
    console.log(error)
  } )

  navigate("/", {replace: true})
  }


  const addProduct = async (body) => {
    // const token = window.localStorage.getItem("token")

const config = {
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Token ${token}`
  }
}

const product_url = `/digital-warehouse/products/`


await axios.post(product_url, body, config).then(async(res) => {
  const products_res = await getProducts();
  setProduct(products_res.products);
}).catch((error) => {
  console.log(error)
} )

navigate("/", {replace: true})
}

  

  return (
    <ProductsContext.Provider value={{ products, editProduct, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useContextProducts = () => useContext(ProductsContext);
export const ProductsConsumer = ProductsContext.Consumer;