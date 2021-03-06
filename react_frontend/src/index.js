import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { render } from "react-dom";


import './assets/fonts/Montserrat Alternates/MontserratAlternates-Regular.ttf';
import './assets/fonts/Montserrat Alternates/MontserratAlternates-Light.ttf';
import './assets/fonts/Montserrat Alternates/MontserratAlternates-Bold.ttf';


import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./components/Layout"

import Landing from "./pages/index"

import { MenuProvider } from "./context/MenuContext"
import { ProductsProvider } from "./context/ProductsContext"
import { AuthProvider } from "./context/AuthContext"
import ProductDetails from './pages/product/[id]';
import CreateProduct from './pages/create-product';
import Categories from './pages/categories';
import CategoryDetails from './pages/category/[id]';
import CreateCategory from './pages/create-category';
import Clients from './pages/clients';
import ClientDetails from './pages/client/[id].jsx';
import CreateClient from "./pages/create-client"
import Orders from './pages/orders';
import CreateOrder from './pages/create-order';
import OrderDetails from './pages/orders/[id]';
import Logout from './pages/logout';
import PrintOrder from './pages/print/[id]';



const rootElement = document.getElementById("root");
render(
  <Router>
    <AuthProvider>
      <ProductsProvider>
        <MenuProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/products/:id" element={<ProductDetails />} />
              <Route exact path="/create-product" element={<CreateProduct />} />
              <Route exact path="/categories" element={<Categories />} />
              <Route exact path="/category/:id" element={<CategoryDetails />} />
              <Route exact path="/create-category" element={<CreateCategory />} />
              <Route exact path="/clients" element={<Clients />} />
              <Route exact path="/client/:id" element={<ClientDetails />} />
              <Route exact path="/create-client" element={<CreateClient />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/create-order" element={<CreateOrder />} />
              <Route exact path="/order/:id" element={<OrderDetails />} />
              <Route exact path="/print/:id" element={<PrintOrder />} />
              <Route exact path="/logout" element={<Logout />} />
            </Routes>
          </Layout>
        </MenuProvider>
      </ProductsProvider>
    </AuthProvider>
  </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
