import React, { Component } from "react";
import axios from "axios";

export default class Asistencias extends Component {
  state = {
    carreras: [],
    users: [],
    asistencias: []
  };

  componentDidMount() {
    this.getCarrera();
    this.getAlumno();
    this.getAsistencias();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:4000/carrera");
    // this.state.carreras = carrera.data;
    this.setState({
      carreras: carrera.data
    });
    console.log(this.state.carreras);
  };

  getAlumno = async () => {
    const response = await axios.get("http://localhost:4000/alumno");
    this.setState({
      users: response.data
    });
    console.log(this.state.users);
  };

  getAsistencias = async () => {
    const response = await axios.get("http://localhost:4000/asistencias");
    this.setState({
      asistencias: response.data.todas
    });
    console.log(this.state.asistencias);
  };

  render() {
    return (
      <div className="container">
        <div className="titulo">
          <h2>Sección de Asistencias</h2>
        </div>
        <div className="listaAsistencias">
          <ul>
            {this.state.asistencias.map(asistencia => (
              <div className="lista" key={asistencia.id_asistencias}>
                <li>
                  <span>
                    {" "}
                    <strong>Asignatura : </strong>{" "}
                    {asistencia.asistenciasMateria.nombre}
                  </span>
                  <br />
                  <span>
                    {" "}
                    <strong>Numero de Asistencias : </strong>{" "}
                    {asistencia.numero_asistencias}
                  </span>
                  <br />

                  <span>
                    {" "}
                    <strong>Faltas Permitidas : </strong>{" "}
                    {asistencia.asistenciasMateria.faltas_permitidas}
                  </span>
                  <br />


                  <span>
                    {" "}
                    <strong>Alumno : </strong>{" "}
                    {asistencia.asistenciasAlumno.nombres}{" "}
                    {asistencia.asistenciasAlumno.apellido_paterno}{" "}
                    {asistencia.asistenciasAlumno.apellido_materno}
                  </span>
                  {/* <br/>
                <span>{asistencia.asistenciasAlumno.apellido_paterno}</span>
                <br/>
                <span>{asistencia.asistenciasAlumno.apellido_materno}</span> */}
                </li>
                <br />
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
