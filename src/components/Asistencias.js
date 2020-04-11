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
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"> ASIGNATURA</th>
            <th scope="col"> NÚMERO DE ASISTENCIAS</th>
            <th scope="col"> FALTAS PERMITIDAS</th>
            <th scope="col"> ALUMNO</th>
          </tr>
        </thead>
        <tbody>
          {this.state.asistencias.map(asistencia => (
            <tr key={asistencia.id_asistencias}>
              <td>{asistencia.asistenciasMateria.nombre}</td>
              <td>{asistencia.numero_asistencias}</td>
              <td>{asistencia.asistenciasMateria.faltas_permitidas}</td>
              <td>
                {asistencia.asistenciasAlumno.nombres}{" "}
                {asistencia.asistenciasAlumno.apellido_paterno}{" "}
                {asistencia.asistenciasAlumno.apellido_materno}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
