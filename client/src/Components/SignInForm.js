import React from 'react';
import { Link, Redirect } from 'react-router-dom'

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
            return <Redirect to="/portfolio" />
        }

        return (
            <div>
                <h3>Sign In</h3>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="email" placeholder="email" value={this.state.email} />
                    <input type="password" onChange={this.handleChange} name="password" placeholder="password" value={this.state.password} />
                    <input type="submit" />
                </form>
                or <Link to="/signup">Sign Up</Link>
            </div>
        )
    }
}

export default SignInForm;