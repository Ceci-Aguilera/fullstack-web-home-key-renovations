import React from "react";
import "../styles/Categories.css";

import { useEffect, useState } from "react";

import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_API_URL

export default function Categories() {

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
        <div className="categories-div">

            <h1 className="categories-title">Categories</h1>

            <div className="categories-add-div">
                        <Button href={`/create-category`} variant="secondary" className="categories-add-button">
                           + ADD New Category
                        </Button>
                    </div>

            {categories == null ? <div></div> :

                <div className="categories-list">
                    {categories.sort(function (a, b) {
                        if (a.title > b.title) {
                            return 1;
                        } else if (a.title < b.title) {
                            return -1;
                        }
                        return 0;
                    }).map((cat, index) => {
                        return (
                            <InputGroup key={index} className="mb-3 categories-list-element">
                                <div className="categories-list-element-div">
                                    <p className="categories-list-element-p">
                                        {cat.title}
                                    </p>
                                </div>
                                <Button href={`/category/${cat.id}`} variant="secondary" className="categories-list-element-button">
                                    Edit
                                </Button>
                            </InputGroup>
                        );
                    })}

                </div>
            }

        </div>
    );
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