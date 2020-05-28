import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            SISTEMA DE CALIFICACIONES
          </Link>
          <div className="navbar" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link to={"/alumno"} className="nav-item nav-link">
                Alumno{" "}
              </Link>

              <Link to={"/maestro"} className="nav-item nav-link">
                Maestro{" "}
              </Link>

              <Link to={"/asistencias"} className="nav-item nav-link">
                Asistencias{" "}
              </Link>

              <Link to={"/materia"} className="nav-item nav-link">
                Materias{" "}
              </Link>
              <Link to={"/calificacion"} className="nav-item nav-link">
                Calificar Materia{" "}
              </Link>

              <Link to={"/boleta"} className="nav-item nav-link">
                Boleta{" "}
              </Link>
              
              <a className="nav-item nav-link" href="http://localhost:8080/documentosGenerados/imprimir/3-2-4-2">Boleta generada</a>

              <a className="nav-item nav-link" href="http://localhost:8080"> Proyecto Oscar</a>
              <Link to={"/login"} className="nav-item nav-link" > Login </Link>
           </div>
          </div>
        </div>
      </nav>
    );
  }
}
