import React, { Component } from "react";
import axios from "axios";
// import Dropdown from "react-bootstrap/Dropdown";
// import styles from "./styles/AlumnoMateria.module.css";

export default class AlumnoMateria extends Component {
  state = {
    carreras: [],
    gruposCrarrea: [],
    materiasGrupo: [],
    alumnoGrupo: [],
   
    calificaciones: {
      [id]: {
        bimestre_uno: "",
        bimestre_dos: "",
        ordinario: "",
        promedio_bimestral: "",
        promedio_final: "",
        extraordinario: "",
        titulo: "",
        insuficiencia: "",
      }
    },
  };

  componentDidMount() {
    this.getCarrera();
  }

  getCarrera = async () => {
    const response = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: response.data,
    });
    console.log("CARRERAS");
    console.log(this.state.carreras);
  };

  getGruposByCarrea = async (id_carrera) => {
    const response = await axios.get(
      "http://localhost:8080/carreras/grupos?id_carrera=" + id_carrera
    );
    this.setState({
      gruposCrarrea: response.data,
    });
    console.log("GRUPOS_CARRERAS");
    console.log(this.state.gruposCrarrea);
  };

  getMateriasByGruop = async (id_grupo) => {
    console.log(id_grupo);
    const response = await axios.get(
      "http://localhost:8080/materias/list_mat?id_grupo=" + id_grupo
    );
    this.setState({
      materiasGrupo: response.data,
    });
    console.log("MATERIAS_GRUPO");
    console.log(this.state.materiasGrupo);
  };

  getAlumnosByMateria = async (id_materia) => {
    console.log(id_materia);
    const response = await axios.get(
      "http://localhost:8080/materias/list_alu?id_materia=" + id_materia
    );
    this.setState({
      alumnoGrupo: response.data,
    });
    console.log("ALUMNOS_GRUPO");
    console.log(this.state.alumnoGrupo);
  };

  onChange = (id, event) => {
    const { calificaciones } = this.state;
    const { name, value } = event.target;
    this.setState({
      calificaciones: {
        ...calificaciones,
        [id]: {
          ...calificaciones[id],
          [name]: value,
        },
      },
    });
  };

  calificar = async (event) => {
    event.preventDefault();
  };

  render() {
    const {
      carreras,
      gruposCrarrea,
      materiasGrupo,
      alumnoGrupo,
      calificaciones,
    } = this.state;

    return (
      <>
        <div className="row ">
          {/* CARRERAS */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <div className="h3 text-center">Seleccionar Licenciatura</div>

              <ul className="list-group">
                {carreras.map((carrera) => (
                  <li
                    key={carrera.id_carrera}
                    className="list-group-item"
                    onClick={() => this.getGruposByCarrea(carrera.id_carrera)}
                  >
                    {carrera.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GRUPOS */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <div className="h3 text-center">Seleccionar Grupo</div>
              <ul className="list-group">
                {gruposCrarrea.map((grupo) => (
                  <li
                    className="list-group-item"
                    key={grupo.id_grupo}
                    onClick={() => this.getMateriasByGruop(grupo.id_grupo)}
                  >
                    <span>GRUPO : {grupo.clave_grupo}</span>
                    <div className="dropdown-divider"></div>
                    <span>CLAVE LICENCIATURA : {grupo.clave_cuatrimestre}</span>
                    <div className="dropdown-divider"></div>
                    <span>AULA : {grupo.aula}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="dropdown-divider"></div>

          {/* MATERIAS */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <div className="h3 text-center">Calificar Materia</div>
              <ul className="list-group">
                {materiasGrupo.map((materia) => (
                  <div
                    className="card card-body"
                    key={materia.nombre}
                    onClick={() => this.getAlumnosByMateria(materia.id_materia)}
                  >
                    <p>{materia.nombre}</p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="dropdown-divider"></div>

        <div className="row">
          {/* BOLETA */}
          <div className="col-12 col-md-12 col-sm-12">
            <div className="card card-body">
              <div className="h3 text-center">Boleta</div>
              <div className="boleta">
                <form onSubmit={this.calificar}>
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Alumno</th>
                        <th scope="col">Primer Bimestre</th>
                        <th scope="col">Segundo Bimestre</th>
                        <th scope="col">Ordinario</th>
                        <th scope="col">Promedio Bimestral</th>
                        <th scope="col">Promedio Final</th>
                        <th scope="col">Extraordinario</th>
                        <th scope="col">Título</th>
                        <th scope="col">Insuficiencia</th>
                        <th scope="col"> Calificar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alumnoGrupo.map((alumno, index) => (
                        <tr key={alumno.id_alumno}>
                          <th scope="row">
                            {alumno.nombre} {alumno.apellido_pat}{" "}
                            {alumno.apellido_mat}
                          </th>
                          <td>
                            <input
                              type="number"
                              name="bimestre_uno"
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno].bimestre_uno
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="bimestre_dos"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.bimestre_dos}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="ordinario"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.ordinario}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="promedio_bimestral"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.promedio_bimestral}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="promedio_final"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.promedio_final}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="extraordinario"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.extraordinario}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="titulo"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.titulo}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="insuficiencia"
                              id=""
                              onChange={this.onChange}
                              value={calificaciones.insuficiencia}
                            />
                          </td>
                          <td>
                            <button type="submit" className="btn btn-success">
                              {" "}
                              Calificar
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* </form> */}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
