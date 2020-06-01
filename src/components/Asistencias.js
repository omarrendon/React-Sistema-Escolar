import React, { Component } from "react";
import axios from "axios";

export default class Asistencias extends Component {
  state = {
    carreras: [],
    users: [],
    asistencias: [],
    carreraGrupos: [],
    // asistenciasGrupos: []
    materiaGrupo : []
  };

  componentDidMount() {
    this.getCarrera();
    // this.getAsistencias();
    // this.getMateriasByGruop();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data,
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  };

  getCarrerasByGroup = async (id_carrera) => {
    const idCarrera = await axios.get(
      "http://localhost:8080/carreras/grupos?id_carrera=" + id_carrera
    );
    this.setState({
      carreraGrupos: idCarrera.data,
    });
    console.log("CARRERAS_GRUPOS");
    console.log(this.state.carreraGrupos);
  };

  getMateriasByGruop =  async(id_grupo) => {
    console.log(id_grupo);
    
    const materiasGrupo = await axios.get("http://localhost:8080/materias/list_mat?id_grupo=" + id_grupo);
    this.setState({
      materiaGrupo: materiasGrupo.data
    });
    console.log("MATERIAS_GRUPO");
    console.log(this.state.materiaGrupo);
  }

   getAsistencias = async () => {
    const response = await axios.get(
      "http://localhost:8080/asistencias/listar"
    );
    this.setState({
      asistencias: response.data,
    });
    console.log("asistencias");
    console.log(this.state.asistencias);
  };

  render() {
    return (
      <div className="container p-4">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="card card-body">
              <p className="h3 text-center">Seleccionar Licenciatura</p>
              <ul className=" list-group">
                {this.state.carreras.map((carrera) => (
                  <li
                    className="list-group-item"
                    key={carrera.id_carrera}
                    onClick={() => this.getCarrerasByGroup(carrera.id_carrera)}
                  >
                    {carrera.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="dropdown-divider"></div>

        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="card card-body">
              <p className="h3 text-center">Calificar Grupo</p>
              <div className="container">
                {
                  this.state.carreraGrupos.map( (id) => (
                    <div className="card card-body" key={id.clave_grupo} onClick={() => this.getMateriasByGruop(id.id_grupo)} >
                      <p>GRUPO : {id.clave_grupo}</p>
                      {" "}
                      <p>CLAVE LICENCIATURA : {id.clave_cuatrimestre}</p>
                      {" "}
                      <p>AULA : {id.aula}</p>
                    </div>
                  ))
                }
                {
                  this.state.materiaGrupo.map( (materia) => (
                    <div className="card card-body" key={materia.nombre} >
                      <p>MATERIAS : {materia.nombre}</p>
                    </div>
                  ))
                 }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
