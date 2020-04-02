import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import './App.css';
import Maestro from "./components/Maestro";
import Alumno from "./components/Alumno";

function App() {
  return (
    <div className="App">
      <Router>

        <Route path="/" exact component={Alumno}/>
        <Route path="/maestro" component={Maestro}/>
        <Route path="/alumno" component={Alumno}/>



      </Router>
    </div>
  );
}

export default App;
