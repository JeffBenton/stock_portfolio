import React from 'react';
import { NavLink } from 'react-router-dom'

class RegisterForm extends React.Component {

    state = {
        name: "",
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // TODO
        // send post request to handle register attempt

        this.setState({
            name: "",
            email: "",
            password: ""
        });
    };

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="name" placeholder="name" value={this.state.name} />
                    <input type="text" onChange={this.handleChange} name="email" placeholder="email" value={this.state.email} />
                    <input type="password" onChange={this.handleChange} name="password" placeholder="password" value={this.state.password} />
                    <input type="submit" />
                </form>
                or <NavLink to="/">Sign In</NavLink>
            </div>
        )
    }
}

export default RegisterForm;