import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignInForm from "./Components/SignInForm";
import RegisterForm from "./Components/RegisterForm"

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/signup">
                    <RegisterForm />
                </Route>

                <Route path="/">
                    <SignInForm />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
