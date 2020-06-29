import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default class Navigation extends Component {
  reload = () => {
    window.location.reload(true);
  };


  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to={"/"} className="navbar-brand">
            SISTEMA DE CALIFICACIONES{" "}
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
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

            {/* <a onClick={this.reload} className="nav-item nav-link">
              Iniciar Sesion{" "}
            </a> */}
            {/* <Link to={"/loginAdministrador"} className="nav-item nav-link">
              Iniciar Sesion{" "}
            </Link> */}
            <a
              className="nav-item nav-link"
              href="http://localhost:8080/documentosGenerados/imprimir/3-2-4-2"
            >
              Boleta generada
            </a>

            <a className="nav-item nav-link" href="http://localhost:8080/file">
              {" "}
              Proyecto Oscar
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
