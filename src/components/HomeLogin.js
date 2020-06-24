import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import MenuLogin from './MenuLogin';
import Login from './Login';


function HomeLogin() {
  return (
    <div className="App">
      <Router>
        <MenuLogin />

        <div className="container p-4">
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default HomeLogin;
