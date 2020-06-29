import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default class MenuLogin extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to={"/"} className="navbar-brand">
            SISTEMA DE CALIFICACIONES SEL ALUMNO{" "}
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="mr-auto">
            <Link to={"/login"} className="nav-item nav-link">
              Alumno{" "}
            </Link>
            <Link to={"/loginAdministrador"} className="nav-item nav-link">
              Administrador{" "}
            </Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
