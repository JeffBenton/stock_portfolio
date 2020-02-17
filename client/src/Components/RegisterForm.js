import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class RegisterForm extends React.Component {

    state = {
        name: "",
        email: "",
        password: "",
        success: false,
        errors: {}
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            })
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    window.sessionStorage.setItem("id", responseJSON["id"]);
                    window.sessionStorage.setItem("auth_token", responseJSON["auth_token"]);
                    this.setState({
                        success: true
                    });
                }
                else {
                    this.setState({
                        errors: responseJSON["errors"],
                        password: ""
                    })
                }
            });
    };

    displayErrors = () => {
        return (
            Object.keys(this.state.errors).map(key => {
                return (<Row className="justify-content-md-center"key={key}>{key} {this.state.errors[key]}</Row>)
            })
        );
    };

    render() {
        if(this.state.success || window.sessionStorage.key("auth_token")) {
            return <Redirect to='/profile' />
        }

        return (
            <Container>
                <Row className="justify-content-md-center"> <h3>Sign Up</h3></Row>
                {this.displayErrors()}
                <Row className="justify-content-md-center">
                    <Form onSubmit={this.handleSubmit}>
                        <Col><Form.Group>
                            <Form.Control type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </Form.Group></Col>
                        <Col><Form.Group>
                            <Form.Control type="email" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </Form.Group></Col>
                        <Col><Form.Group>
                            <Form.Control type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </Form.Group></Col>
                        <Col><Button variant="primary" type="submit">
                            Sign Up
                        </Button></Col>
                    </Form>
                </Row>
                <Row className="justify-content-md-center"><div>or <Link to="/">Sign In</Link></div></Row>
            </Container>
        )
    }
}

export default RegisterForm;