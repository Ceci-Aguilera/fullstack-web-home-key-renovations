import React from "react";

import { Card, Button, Container, Form } from "react-bootstrap";

import "../styles/Login.css";


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom"

function Login() {

    const { user, login, logout } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async(e) => {
        e.preventDefault();
        const body = JSON.stringify({
            username,
            password
        })
        const result = await login(body);
        if(result == "Success"){
            navigate("/", {replace: true})
        }
    }


    return (
        <div className="login-div">
            <div className="login-div-wrapper">
                <div className="login-spacer" />
                <Card className="login-card">
                    <Card.Header className="login-card-header">
                        Login
                    </Card.Header>

                    <Card.Body className="login-card-body">
                        <Form className="login-form">
                            <Form.Group className="mb-3 login-form-control-group">
                                <Form.Label className="mb-3 login-form-label">Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" className="mb-3 login-form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3 login-form-control-group">
                                <Form.Label className="mb-3 login-form-label">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className="mb-3 login-form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <div className="login-button-div">
                                <Button variant="warning" className="login-button" onClick={(e) => onLogin(e)}>Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Login;