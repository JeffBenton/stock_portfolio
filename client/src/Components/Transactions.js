import React from "react";
import {Link, Redirect} from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Transactions extends React.Component {

    state = {
        transactions: [],
        logout: false
    };

    componentDidMount() {
        const user_id = window.sessionStorage.getItem("id");
        const auth_token = window.sessionStorage.getItem("auth_token");
        fetch(`/api/transactions/${user_id}`, {
            headers: {
                "AUTH_TOKEN": auth_token
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                if(responseJSON["success"]) {
                    this.setState({
                        transactions: responseJSON["transactions"]
                    })
                }
                else {
                    this.handleLogout();
                }
            })
    }

    handleLogout = () => {
        window.sessionStorage.clear();
        this.setState({
            logout: true
        });
    };

    render() {
        if(this.state.logout) {
            return (<Redirect to="/" />)
        }

        return (
            <Container>
                <Row>
                    <Col md={4}><h3>Transactions</h3></Col>
                    <Col md={{ span: 4, offset: 4 }}><p><Link to="/portfolio">portfolio</Link> | transactions | <Link to="#" onClick={this.handleLogout}>logout</Link></p></Col>
                </Row>

                {this.state.transactions.map(t => {
                    let plural = t.quantity > 1 ? "s" : "";
                    return (
                        <Row key={t.id}><p>BUY ({t.ticker}) - {t.quantity} share{plural} @ ${t.price}</p></Row>
                    )
                })}
            </Container>
        )
    }
}

export default Transactions;