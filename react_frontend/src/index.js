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


const rootElement = document.getElementById("root");
render(
  <Router>
    <MenuProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Layout>
    </MenuProvider>
  </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
