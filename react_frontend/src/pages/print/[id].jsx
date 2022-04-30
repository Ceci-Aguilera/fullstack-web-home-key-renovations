import React from "react";
import { useParams } from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/PrintOrder.css";

import { useEffect, useState, useRef } from "react";

import axios from "axios";

import { useNavigate } from 'react-router';


import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import { useAuth } from "../../context/AuthContext";


import ReactToPrint from "react-to-print";
import OrderToPrint from "../../components/OrderToPint";


const domain = process.env.REACT_APP_BACKEND_API_URL

const PrintOrder = () => {
  const { id } = useParams();

  const { user } = useAuth();


  const navigate = useNavigate();

  const [order, setOrder] = useState(null)
  const [productVariations, setProductVariations] = useState(null)


  const { products } = useContextProducts()

  const [new_product_variations, setNewProductVariations] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [bill_for_service, setBillForService] = useState(0);
  const [current_client, setCurrentClient] = useState(null);
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState("Low");

  const [start_date, setStart_date] = useState(new Date().toISOString().slice(0, -14));
  const [end_date, setEnd_date] = useState(new Date().toISOString().slice(0, -14));

  let componentRef = useRef();

  useEffect(() => {

    async function fetchOrder() {
      const temp_order = await getOrder(id);
      setOrder(temp_order.order);
      setProductVariations(temp_order.product_variations);
    }

    if (user != null && id != null && id !== undefined) {
      fetchOrder();
    }

  }, [id, user])

  useEffect(() => {
    if (order != null) {
      setConfirmed(order.confirmed)
      setBillForService(order.bill_for_service)
      setDescription(order.description)
      setScale(order.scale);
      setCurrentClient(order.client.id);
      setStart_date(new Date(order.start_date).toISOString().slice(0, -14));
      setEnd_date(new Date(order.end_date).toISOString().slice(0, -14))
    }
  }, [order])


  useEffect(() => {
    if (productVariations != null) {
      setNewProductVariations(productVariations);
    }

  }, [productVariations]);




  return (order == null || productVariations == null) ? <div></div> : (
    <>
      <div className="print-order-div">

      <ReactToPrint
          trigger={() => <div className="print-order-button-div"><Button variant="warning" className="print-order-button">Print</Button></div>}
          content={() => componentRef}
        />

        <OrderToPrint order={order} product_variations={productVariations} ref={(element) => (componentRef = element)} />

       </div>
    </>
  );
};

const getOrder = async (id) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  const order_url = `${domain}/digital-warehouse/order/${id}/`


  return axios.get(order_url, config).then(async (res) => {
    const result = await res.data;
    return {
      status: "ORDER_FOUND", order: result["Order"], product_variations: result["Products"]
    }
  }).catch((error) => {
    return {
      status: "ORDER_NOT_FOUND", order: null, product_variations: []
    }
  })
}



const calculateTaxes = (items) => {
  var total_taxes = 0;
  for (let i = 0; i < items.length; i++) {
    total_taxes += (items[i].amount * items[i].base_pricing)
  }
  return total_taxes;
}




export default PrintOrder;