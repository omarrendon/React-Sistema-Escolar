import React, { Component } from "react";
import axios from "axios";

export default class Asistencias extends Component {
  state = {
    carreras: [],
    users: [],
    asistencias: [],
    carreraGrupos: [],
    materiaGrupo: [],
    alumnoGrupo: [],

    asistenciasData: {
      numero_asistencias: "",
      fk_materia: "",
      fk_alumno: "",
    },
  };

  componentDidMount() {
    this.getCarrera();
    this.getAsistencias();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data,
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  };

  getGrupoByCarrea = async (id_carrera) => {
    const idCarrera = await axios.get(
      "http://localhost:8080/carreras/grupos?id_carrera=" + id_carrera
    );
    this.setState({
      carreraGrupos: idCarrera.data,
    });
    console.log("CARRERAS_GRUPOS");
    console.log(this.state.carreraGrupos);
  };

  getMateriasByGruop = async (id_grupo) => {
    console.log(id_grupo);
    const materiasGrupo = await axios.get(
      "http://localhost:8080/materias/list_mat?id_grupo=" + id_grupo
    );
    this.setState({
      materiaGrupo: materiasGrupo.data,
    });
    console.log("MATERIAS_GRUPO");
    console.log(this.state.materiaGrupo);
  };

  getAlumnosByMateria = async (id_materia) => {
    console.log(id_materia);
    const alumnosGrupo = await axios.get(
      "http://localhost:8080/materias/list_alu?id_materia=" + id_materia
    );
    this.setState({
      alumnoGrupo: alumnosGrupo.data,
    });
    console.log("ALUMNOS_GRUPO");
    console.log(this.state.alumnoGrupo);
  };

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

  getIdAlumno = async (id_alumno) => {
    console.log(id_alumno);
  };

  onChange = (e) => {
    
    this.setState({
      asistenciasData: {
        ...this.state.asistenciasData,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const {
      numero_asistencias,
      fk_materia,
      fk_alumno,
    } = this.state.asistenciasData;

    console.log("NUMEROSSS! " + numero_asistencias, fk_materia, fk_alumno);

    if (numero_asistencias === "" || fk_materia === "" || fk_alumno === "") {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:8080/asistencias/crear", numero_asistencias, fk_materia, fk_alumno);
      // await axios.post("http://localhost:8080/alumnosmateria/crear", )
      this.setState({
        asistenciasData: {
          numero_asistencias:0 ,
          fk_materia: "",
          fk_alumno: "",
        },
      });
    }
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
                    onClick={() => this.getGrupoByCarrea(carrera.id_carrera)}
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
                {this.state.carreraGrupos.map((id) => (
                  <div
                    className="card card-body"
                    key={id.clave_grupo}
                    onClick={() => this.getMateriasByGruop(id.id_grupo)}
                  >
                    <p>GRUPO : {id.clave_grupo}</p>{" "}
                    <p>CLAVE LICENCIATURA : {id.clave_cuatrimestre}</p>{" "}
                    <p>AULA : {id.aula}</p>
                  </div>
                ))}
                <hr />
                {this.state.materiaGrupo.map((materia) => (
                  <div
                    className="card card-body"
                    key={materia.nombre}
                    onClick={() => this.getAlumnosByMateria(materia.id_materia)}
                  >
                    <h3>MATERIAS : {materia.nombre}</h3>
                  </div>
                ))}
                <div className="dropdown-divider"></div>

                {/*  */}
                <form className="form-group" onSubmit={this.onSubmit}>
                  <select
                    value={this.state.asistenciasData.fk_alumno}
                    number={this.state.asistenciasData.fk_alumno}
                    name="fk_alumno"
                    type="number"
                    onChange={this.onChange}
                    className="custom-select"
                  >
                    {this.state.alumnoGrupo.map((alumno) => (
                      <option
                        value={alumno.id_alumno}
                        key={alumno.id_alumno}
                      >
                        {alumno.nombre} {alumno.apellido_pat}{" "}
                        {alumno.apellido_mat}
                      </option>
                    ))}
                  </select>

                  <input
                    value={this.state.asistenciasData.numero_asistencias}
                    type="number"
                    name="numero_asistencias"
                    placeholder="Asistencias"
                    onChange={this.onChange}
                    className="form-control"
                    min="0"
                    max="80"
                  />

                  <select
                    value={this.state.asistenciasData.fk_materia}
                    name={"fk_materia"}
                    type="number"
                    onChange={this.onChange}
                    className="custom-select"
                  >
                    {this.state.materiaGrupo.map((materia) => (
                      <option
                        value={materia.id_materia}
                        key={materia.id_materia}
                      >
                        {" "}
                        {materia.nombre}
                      </option>
                    ))}
                  </select>

                  <hr />
                  <button type="submit" className="btn btn-success">
                    {" "}
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
