import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

import axios from "axios";


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
      status: "PRODUCTS_FOUND", products: [] 
    }
  } )


}





const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {

  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products_res = await getProducts();
      setProduct(products_res.products);
    }
    
    fetchProducts();
  }, [])

  

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useContextProducts = () => useContext(ProductsContext);
export const ProductsConsumer = ProductsContext.Consumer;