import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Maestro from "./Maestro";
import Alumno from "./Alumno";
import Navigation from "./Navigation";
import Asistencias from "./Asistencias";
import Materia from "./Materia";
import AlumnoMateria from "./AlumnoMateria";
import Boleta from "./Boleta";

export default class HomeSistema extends Component {
 render() {
     return(
        <div className="App">
        <Router>
          <Navigation />
  
          <div className="container p-4">
            <Route path="/" exact component={Alumno} />
            <Route path="/maestro" component={Maestro} />
            <Route path="/alumno" component={Alumno} />
            <Route path="/asistencias" component={Asistencias} />
            <Route path="/materia" component={Materia} />
            <Route path="/boleta" component={Boleta}/>
            <Route path="/calificacion" component={AlumnoMateria} />
            {/* <Route path="/home" component={Home} /> */}
          </div>
        </Router>
      </div>
     )
 }
}