import React from 'react';
import { Link, Redirect } from 'react-router-dom'

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
                return (<p key={key}>{key} {this.state.errors[key]}</p>)
            })
        );
    };

    render() {
        if(this.state.success) {
            return <Redirect to='/portfolio' />
        }

        return (
            <div>
                <h3>Sign Up</h3>
                {this.displayErrors()}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="name" placeholder="name" value={this.state.name} />
                    <input type="text" onChange={this.handleChange} name="email" placeholder="email" value={this.state.email} />
                    <input type="password" onChange={this.handleChange} name="password" placeholder="password" value={this.state.password} />
                    <input type="submit" />
                </form>
                or <Link to="/">Sign In</Link>
            </div>
        )
    }
}

export default RegisterForm;