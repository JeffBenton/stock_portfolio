import React from 'react';
import { Link, Redirect } from 'react-router-dom'

class RegisterForm extends React.Component {

    state = {
        name: "",
        email: "",
        password: "",
        success: false
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
                if(responseJSON) {
                    this.setState({
                        success: true
                    });
                }
            });
    };

    render() {
        if(this.state.success) {
            return <Redirect to='/portfolio' />
        }

        return (
            <div>
                <h3>Sign Up</h3>
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