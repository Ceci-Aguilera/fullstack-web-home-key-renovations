import React from "react";
import "../styles/Landing.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListOfProducts from "../components/ListOfProfucts";

import { useContextProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

import axios from "axios";
import Login from "../components/Login";

const domain = process.env.REACT_APP_BACKEND_API_URL

export default function Landing() {

  const { products } = useContextProducts()

  const { user } = useAuth()

  const [categories, setCategories] = useState([]);
  const [current_category, setCurrentCategory] = useState(-1)
  const [productsToDisplay, setProductsToDisplay] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const categories_temp = await getCategories();
      setCategories(categories_temp.categories);
    }

    if (user != null) {
      fetchCategories();
    }
  }, [user])


  useEffect(() => {
    setProductsToDisplay(products);
  }, [products])

  const onChangeCategory = (e, cat_id) => {
    e.preventDefault();
    setCurrentCategory(cat_id);
    setProductsToDisplay(products.filter((element) => {
      if (cat_id === -1) {
        return element;
      }
      else if (element.category === cat_id) {
        return element;
      }
    }));
  }


  return (user == null) ? <Login /> : (
    <div className="landing-div">

      <Row className="landing-row">
        <Col xs={12} sm={12} md={12} lg={4}>
          <div className="landing-categories-div">
            <h2 className="landing-categories-h2">
              Categories
            </h2>

            <div className="landing-categories-list-div">
              {(current_category == -1) ?
                <div className="landing-categories-list-element-div landing-categories-list-element-selected">
                  <p className="landing-categories-list-element-p">
                    ALL
                  </p>

                  <p className="landing-categories-list-element-p">
                    <span className="landing-categories-list-element-span">{productsToDisplay.length}</span> Products
                  </p>
                </div> :
                <div className="landing-categories-list-element-div" onClick={(e) => onChangeCategory(e, -1)}>
                  <p className="landing-categories-list-element-p">
                    ALL
                  </p>
                </div>}

              {(categories == null || categories.length === 0) ? <div></div> :
                <>
                  {categories.map((cat, index) => {
                    return (current_category == cat.id) ?
                      <div key={index} className="landing-categories-list-element-div landing-categories-list-element-selected">
                        <p className="landing-categories-list-element-p">
                          {cat.title}
                        </p>

                        <p className="landing-categories-list-element-p">
                          <span className="landing-categories-list-element-span">{productsToDisplay.length}</span> Products
                        </p>
                      </div> : <div className="landing-categories-list-element-div" onClick={(e) => onChangeCategory(e, cat.id)}>
                        <p className="landing-categories-list-element-p">
                          {cat.title}
                        </p>
                      </div>
                  })}

                </>
              }
            </div>


          </div>

        </Col>

        <Col xs={12} sm={12} md={12} lg={8}>

          <ListOfProducts products={productsToDisplay} />


        </Col>
      </Row>

    </div>
  );
}

const getCategories = async () => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  const categories_url = `${domain}/digital-warehouse/categories/`


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