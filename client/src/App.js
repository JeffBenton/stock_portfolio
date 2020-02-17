import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignInForm from "./Components/SignInForm";
import RegisterForm from "./Components/RegisterForm";
import ViewContainer from "./Containers/ViewContainer";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={SignInForm} />
                <Route path="/signup" component={RegisterForm} />
                <Route path="/profile" component={ViewContainer} />

                <Redirect to="/" />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
