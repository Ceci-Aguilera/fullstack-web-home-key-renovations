import React from "react";
import { useParams } from 'react-router-dom';

import { useContextProducts } from "../context/ProductsContext";


import "../styles/Order.css";

import { Row, Col, Button, Form, InputGroup, Card } from "react-bootstrap";

import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from 'react-router';
import SelectProducts from "../components/SelectProducts";
import CreateProductVariationModal from "../components/CreateProductVariationModal";
import EditProductVariationModal from "../components/EditProductVariationModal";


const CreateOrder = () => {

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

  const [product_variations, setProductVariations] = useState([]);

  const [confirmed, setConfirmed] = useState(false);
  const [bill_for_service, setBillForService] = useState(0);


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClients() {
      const clients_temp = await getClients();
      setClients(clients_temp.clients);
    }

    fetchClients();
  }, [])

  useEffect(() => {
    if (current_item != null) {
      handleShowModal();
    }
  }, [current_item])


  useEffect(() => {
    handleCloseModal();
    setCurrentItem(null)
  }, [product_variations])

  useEffect(() => {
    handleCloseModalEdit();
    setCurrentItemEdit(null)
  }, [product_variations])

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
    setProductVariations([...product_variations, { id: item.id, title: item.title, amount: amount, base_pricing: item.pricing }]);
  }


  const onDeleteItem = (e, index) => {
    e.preventDefault();
    setProductVariations(product_variations.filter((_, i) => i !== index));
  }

  const editProductVariation = (index, amount) => {
    product_variations[index].amount = amount;
    setProductVariations([...product_variations]);
  }



  return (
    <>
      <div className="create-order-div">
        <Row className="create-order-row">
          <Col xs={12} sm={12} md={12} lg={6} className="create-order-col">
            <Card className="create-order-card">
              <Card.Header className="create-order-card-header">
                Order
              </Card.Header>

              <Card.Body className="create-order-card-body">
                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Client</Form.Label>
                  <Form.Select aria-label="Default select example">
                    {clients.map((client, index) => {
                      return (<option key={index} value={client.id}>{client.email} - {client.phone}</option>);
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Description</Form.Label>
                  <Form.Control as="textarea" rows={6} placeholder="Description" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Scale</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="product-detail-form-card-body-form-label">Bill of Installation Service</Form.Label>
                  <Form.Control type="number" steps="0.01" placeholder="0.0" value={bill_for_service} onChange={(e) => setBillForService(e)} />
                </Form.Group>

                <div key={`default-checkbox}`} className="mb-3" onChange={(e) => setConfirmed(e.target.checked)}>
                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label="Confirmed"
                    className="product-detail-form-card-body-form-label"
                  />
                </div>

                <div>
                  <p className="product-detail-form-card-body-form-label">Products</p>
                  {product_variations.map((product_var, index) => {
                    return (
                      <div key={index} className="create-order-product-var-div">
                        <p className="create-order-product-var-p">
                          {product_var.amount} x {product_var.title}
                        </p>

                        <p className="create-order-product-var-p">
                          ${parseFloat(product_var.amount * product_var.base_pricing).toFixed(2)}
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
                  Total Amount: ${parseFloat((calculateTaxes(product_variations) + bill_for_service)
                    + (calculateTaxes(product_variations) + bill_for_service) * 0.07).toFixed(2)}
                </p>

              </Card.Body>
              <Card.Footer className="create-order-card-footer">
                <Button variant="secondary" className="create-order-cancel-button">
                  CANCEL
                </Button>

                <Button variant="warning" className="create-order-save-button">
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
        <EditProductVariationModal show={showModalEdit} handleClose={handleCloseModalEdit} index={current_item_edit} product_variations={product_variations} editProductVariation={editProductVariation} />
      </div>
    </>
  );
};





const getClients = async () => {
  // const token = window.localStorage.getItem("token")

  const config = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Token ${token}`
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


const calculateTaxes = (items) => {
  var total_taxes = 0;
  for (let i = 0; i < items.length; i++) {
    total_taxes += (items[i].amount * items[i].base_pricing)
  }
  return total_taxes;
}



export default CreateOrder;