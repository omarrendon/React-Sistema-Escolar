import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/alumno"} className="Links"> Alumno </Link> 
            </li>
            <li>
              <Link to={"/maestro"} className="Links"> Maestro </Link> 
            </li>
            <li>
            <Link to={"/"} className="Links"> Home </Link> 
            </li>
            <li>
            <Link to={"/asistencias"} className="Links"> Asistencias </Link> 
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
