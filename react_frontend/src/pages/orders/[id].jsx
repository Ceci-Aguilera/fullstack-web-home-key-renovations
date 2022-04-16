import React from "react";
import { useParams } from 'react-router-dom';

import { useContextProducts } from "../../context/ProductsContext";


import "../../styles/ProductDetails.css";

import { useEffect, useState } from "react";

import axios from "axios";
import ClientDetailForm from "../../components/EditClientForm";

import { useNavigate } from 'react-router';


import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import SelectProducts from "../../components/SelectProducts";
import CreateProductVariationModal from "../../components/CreateProductVariationModal";
import EditProductVariationModal from "../../components/EditProductVariationModal";

import { useAuth } from "../../context/AuthContext";


const OrderDetails = () => {
  const { id } = useParams();

  const {user} = useAuth();


  const navigate = useNavigate();

  const [order, setOrder] = useState(null)
  const [productVariations, setProductVariations] = useState(null)

  const [clients, setClients] = useState([]);

  const { products } = useContextProducts()

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleShowModalEdit = () => setShowModalEdit(true);

  const [current_item, setCurrentItem] = useState(null)
  const [current_item_edit, setCurrentItemEdit] = useState(null)

  const [new_product_variations, setNewProductVariations] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [bill_for_service, setBillForService] = useState(0);
  const [current_client, setCurrentClient] = useState(null);
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState("Low");

  const [start_date, setStart_date] = useState(new Date().toISOString().slice(0, -14));
  const [end_date, setEnd_date] = useState(new Date().toISOString().slice(0, -14));

  useEffect(() => {

    async function fetchOrder() {
      const temp_order = await getOrder(id);
      setOrder(temp_order.order);
      setProductVariations(temp_order.product_variations);
    }

    async function fetchClients() {
      const clients_temp = await getClients();
      setClients(clients_temp.clients);
    }



    if (user != null && id != null && id !== undefined) {
      fetchOrder();
      fetchClients();
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


  const onDeleteOrder = async (e) => {
    e.preventDefault();
    await deleteOrder(order.id, navigate);
  }

  // =====================================
  // Edit Products
  // =====================================

  useEffect(() => {
    if (current_item != null) {
      handleShowModal();
    }
  }, [current_item])


  useEffect(() => {
    handleCloseModal();
    setCurrentItem(null)
  }, [new_product_variations])

  useEffect(() => {
    handleCloseModalEdit();
    setCurrentItemEdit(null)
  }, [new_product_variations])

  const onAddItem = (item) => {
    setCurrentItem(item);
  }



  useEffect(() => {
    if (current_item_edit != null) {
      handleShowModalEdit();
    }
  }, [current_item_edit])


  useEffect(() => {
    if (showModal == false) {
      setCurrentItem(null)
    }
  }, [showModal])

  useEffect(() => {
    if (showModalEdit == false) {
      setCurrentItemEdit(null)
    }
  }, [showModalEdit])

  const onEditItem = (e, index) => {
    e.preventDefault();
    setCurrentItemEdit(index);
  }





  const addProductVariation = (item, amount) => {
    setProductVariations([...new_product_variations, { product: { id: item.id, title: item.title, pricing: item.pricing }, amount: amount }]);
  }


  const onDeleteItem = (e, index) => {
    e.preventDefault();
    setProductVariations(new_product_variations.filter((_, i) => i !== index));
  }

  const editProductVariation = (index, amount) => {
    new_product_variations[index].amount = amount;
    setProductVariations([...new_product_variations]);
  }




  const onSaveHandler = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      client_id: current_client,
      description: description,
      scale: scale,
      bill_for_service: parseFloat(bill_for_service),
      confirmed: confirmed,
      product_variations: new_product_variations,
      start_date: start_date,
      end_date: end_date
    });

    await onSave(order.id, body);
    navigate("/orders", { replace: true })
  }






  return (order == null || new_product_variations == null || clients == null) ? <div></div> : (
    <>
      <div>
        <Row className="create-order-row">
          <Col xs={12} sm={12} md={12} lg={6} className="create-order-col">
            <Card className="create-order-card">
              <Card.Header className="create-order-card-header">
                Order
              </Card.Header>

              <Card.Body className="create-order-card-body">
                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Client</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={(e) => setCurrentClient(e.target.value)} value={current_client}>
                    {clients.map((client, index) => {
                      return (<option key={index} value={client.id}> {client.email} - {client.phone}</option>);
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Description</Form.Label>
                  <Form.Control as="textarea" rows={6} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Scale</Form.Label>
                  <Form.Select aria-label="Default select example" value={scale} onChange={(e) => setScale(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Bill of Installation Service</Form.Label>
                  <Form.Control type="number" steps="0.01" placeholder="0.0" value={bill_for_service} onChange={(e) => setBillForService(e.target.value)} />
                </Form.Group>

                <Row className="create-order-start-date-row">
                  <Col xs={6} sm={6} md={6} lg={6} className="create-order-col">
                  <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Start Date</Form.Label>
                  <Form.Control type="date"  value={start_date} onChange={(e) => setStart_date(e.target.value)} />
                </Form.Group>
                  </Col>

                  <Col xs={6} sm={6} md={6} lg={6} className="create-order-col">
                  <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">End Date</Form.Label>
                  <Form.Control type="date"  value={end_date} onChange={(e) => setEnd_date(e.target.value)} />
                </Form.Group>
                  </Col>
                </Row>

                <div key={`default-checkbox}`} className="mb-3" onChange={(e) => setConfirmed(e.target.checked)}>
                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label="Confirmed"
                    className="product-detail-form-card-body-form-label"
                    checked={confirmed}
                  />
                </div>

                <div>
                  <p className="product-detail-form-card-body-form-label">Products</p>
                  {new_product_variations.map((product_var, index) => {
                    return (
                      <div key={index} className="create-order-product-var-div">
                        <p className="create-order-product-var-p">
                          {product_var.amount} x {product_var.product.title}
                        </p>

                        <p className="create-order-product-var-p">
                          ${parseFloat(product_var.amount * product_var.product.pricing).toFixed(2)}
                        </p>

                        <Button variant="warning" className="create-order-product-var-delete-button" onClick={(e) => onEditItem(e, index)}>
                          Edit
                        </Button>

                        <Button variant="danger" className="create-order-product-var-delete-button" onClick={(e) => onDeleteItem(e, index)}>
                          Delete
                        </Button>
                      </div>
                    )
                  })}
                </div>

                <p className="product-detail-form-card-body-form-label">Taxes: 0.7%</p>

                <p className="product-detail-form-card-body-form-label">
                  Total Amount: ${
                    parseFloat(
                      parseFloat(calculateTaxes(new_product_variations)) + parseFloat(bill_for_service)
                      + parseFloat((parseFloat(calculateTaxes(new_product_variations)) + parseFloat(bill_for_service)) * 0.07)
                    ).toFixed(2)}
                </p>

              </Card.Body>
              <Card.Footer className="create-order-card-footer">
                <Button variant="danger" className="create-order-delete-button" onClick={(e) => onDeleteOrder(e)}>
                  DELETE
                </Button>

                <Button href="/orders" variant="secondary" className="create-order-cancel-button">
                  CANCEL
                </Button>

                <Button variant="warning" className="create-order-save-button" onClick={(e) => onSaveHandler(e)}>
                  SAVE
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className="create-order-col">
            <SelectProducts products={products} onAddItem={onAddItem} />
          </Col>
        </Row>

        <CreateProductVariationModal show={showModal} handleClose={handleCloseModal} item={current_item} addProductVariation={addProductVariation} />
        <EditProductVariationModal show={showModalEdit} handleClose={handleCloseModalEdit} index={current_item_edit} product_variations={new_product_variations} editProductVariation={editProductVariation} />
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

  const order_url = `/digital-warehouse/order/${id}/`


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
    total_taxes += (items[i].amount * items[i].product.pricing)
  }
  return total_taxes;
}



const getClients = async () => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

  const clients_url = "/digital-warehouse/clients"


  return axios.get(clients_url, config).then(async (res) => {
    const result = await res.data;
    return {
      status: "CLIENTS_FOUND", clients: result
    }
  }).catch((error) => {
    return {
      status: "CLIENTS_NOT_FOUND", clients: []
    }
  })


}


const deleteOrder = async (id, navigate) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

  const order_url = `/digital-warehouse/order/${id}/`


  axios.delete(order_url, config).then(async (res) => {
    navigate("/orders", { replace: true })
  }).catch((error) => {
  })
}




const onSave = async (id, body) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

  const order_url = `/digital-warehouse/order/${id}/`


  await axios.post(order_url, body, config).then(async (res) => {
  }).catch((error) => {
  })
}


export default OrderDetails;