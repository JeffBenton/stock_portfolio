import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class SignInForm extends React.Component {

    state = {
        email: "",
        password: "",
        success: false,
        error: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch('/api/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                    })
                }
                else {
                    this.setState({
                        password: "",
                        error: responseJSON["error"]
                    })
                }
            });
    };

    render() {
        if(this.state.success) {
            return <Redirect to="/profile" />
        }

        return (
            <Container>
                <Row className="justify-content-md-center"><h3>Sign In</h3></Row>
                <Row className="justify-content-md-center"><p>{this.state.error}</p></Row>
                <Row className="justify-content-md-center">
                    <Form onSubmit={this.handleSubmit}>
                        <Col><Form.Group>
                            <Form.Control type="email" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </Form.Group></Col>
                        <Col><Form.Group>
                            <Form.Control type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </Form.Group></Col>
                        <Col><Button variant="primary" type="submit">
                            Log In
                        </Button></Col>
                    </Form>
                </Row>
                <Row className="justify-content-md-center">
                    <div>or <Link to="/signup">Sign Up</Link></div>
                </Row>
            </Container>
        )
    }
}

export default SignInForm;