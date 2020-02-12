import React from 'react';

class SignInForm extends React.Component {

    state = {
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
        // send post request to handle login attempt

        this.setState({
            email: "",
            password: ""
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="email" placeholder="email" value={this.state.email} />
                    <input type="text" onChange={this.handleChange} name="password" placeholder="password" value={this.state.password} />
                    <input type="submit" />
                </form>
                or <a href="#">Sign Up</a>
            </div>
        )
    }
}

export default SignInForm;