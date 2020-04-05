import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import './App.css';
import Maestro from "./components/Maestro";
import Alumno from "./components/Alumno";
import Navigation from './components/Navigation'
import Home from './components/Home'
import Asistencias from './components/Asistencias'

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        
        <Route path="/" exact component={Home}/>
        <Route path="/maestro" component={Maestro}/>
        <Route path="/alumno" component={Alumno}/>
        <Route path="/asistencias" component={Asistencias}/>


      </Router>
    </div>
  );
}

export default App;
