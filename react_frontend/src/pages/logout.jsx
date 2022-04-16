import React from "react";
import "../styles/Landing.css";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import Login from "../components/Login";

import { useNavigate } from "react-router-dom"

export default function Logout() {

  const {user, logout} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    async function LogoutUser() {
        await logout()
    }

    LogoutUser();
  }, [])

  useEffect(() => {
    if(user == null){
      navigate("/", { replace: true })
    }
  }, [user])

  return (user == null)?<Login />:(
    <div className="landing-div">
    </div>
  );
}