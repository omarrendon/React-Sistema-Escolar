import React, { Component } from "react";
import axios from "axios";
import styles from "./styles/alumno.module.css";
import { Snackbar } from "./snackbar/Snackbar";

export default class AlumnoMateria extends Component {
  snackbarRef = React.createRef();

  state = {
    colorState: {
      activeObj: null,
    },
    colorGrupo: {
      activeObj: null,
    },
    colorMateria: {
      activeObj: null,
    },

    carreras: [],
    gruposCrarrea: [],
    materiasGrupo: [],
    alumnoGrupo: [],
    calificaciones: {},
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
      colorState: {
        ...this.state.colorState,
        activeObj: id_carrera,
      },
    });
    console.log("GRUPOS_CARRERAS");
    console.log(this.state.gruposCrarrea);
  };

  changeStyle = (id_carrera) => {
    if (id_carrera === this.state.colorState.activeObj) {
      return "active list-group-item";
    } else {
      return "inactive list-group-item";
    }
  };

  getMateriasByGruop = async (id_grupo) => {
    console.log(id_grupo);
    const response = await axios.get(
      "http://localhost:8080/materias/list_mat?id_grupo=" + id_grupo
    );
    this.setState({
      materiasGrupo: response.data,
      colorGrupo:{
        ...this.state.colorGrupo, activeObj: id_grupo
      }
    });
    console.log("MATERIAS_GRUPO");
    console.log(this.state.materiasGrupo);
  };

  changeColorGrupo = (id_grupo) => {
    if(id_grupo === this.state.colorGrupo.activeObj){
      return "active list-group-item"
    }else {
      return "inactive list-group-item"
    }
  };

  getAlumnosByMateria = async (id_materia) => {
    console.log(id_materia);
    const response = await axios.get(
      "http://localhost:8080/materias/list_alu?id_materia=" + id_materia
    );
    const alumnoGrupo = response.data;
    let calificaciones = {};
    alumnoGrupo.forEach(({ id_alumno }) => {
      calificaciones = {
        ...calificaciones,
        [id_alumno]: {
          bimestre_uno: "",
          bimestre_dos: "",
          ordinario: "",
          promedio_bimestral: "",
          promedio_final: "",
          extraordinario: "",
          titulo: "",
          insuficiencia: "",
        },
      };
    });
    this.setState({
      alumnoGrupo,
      calificaciones,
      colorMateria:{
        ...this.state.colorMateria, activeObj: id_materia
      }
    });
    console.log("ALUMNOS_GRUPO");
    console.log(this.state.alumnoGrupo);
  };

  changeColorMateria = (id_materia) => {
    if(id_materia === this.state.colorMateria.activeObj){
      return "active list-group-item"
    }else {
      return "inactive list-group-item"
    }
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
    const { calificaciones } = this.state;
    event.preventDefault();
    // const numero = parseInt(calificaciones)
    console.log(calificaciones);

    const data = new FormData(event.target);
    data.set("bimestre_uno", data.get("bimestre_uno"));
    data.set("bimestre_dos", data.get("bimestre_uno"));
    data.set("ordinario", data.get("ordinario"));
    data.set("promedio_bimestral", data.get("promedio_bimestral"));
    data.set("promedio_final", data.get("promedio_final"));
    data.set("extraordinario", data.get("extraordinario"));
    data.set("titulo", data.get("titulo"));
    data.set("insuficiencia", data.get("insuficiencia"));

    axios.post("http://localhost:8080/calificacion/crear", data);
    this.snackbarRef.current.openSnackBar("Se califico correctamente..");
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
                    className={this.changeStyle(carrera.id_carrera)}
                    onClick={() => this.getGruposByCarrea(carrera.id_carrera)}
                  >
                    {carrera.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Snackbar ref={this.snackbarRef} />

          {/* GRUPOS  */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <div className="h3 text-center">Seleccionar Grupo</div>
             
                {gruposCrarrea.map((grupo) => (
                  <div
                    className={this.changeColorGrupo(grupo.id_grupo)}
                    key={grupo.id_grupo}
                    onClick={() => this.getMateriasByGruop(grupo.id_grupo)}
                  >
                    <p>GRUPO : {grupo.clave_grupo}</p>
                    <p>CLAVE LICENCIATURA : {grupo.clave_cuatrimestre}</p>
                    <p>AULA : {grupo.aula}</p>
                  </div>
                ))}
             
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
                    className={this.changeColorMateria(materia.id_materia)}
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
                        <th scope="col">Examen Extraordinario</th>
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
                              className={styles}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="bimestre_dos"
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno].bimestre_dos
                              }
                              className={styles}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="ordinario"
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={calificaciones[alumno.id_alumno].ordinario}
                              className={styles}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="promedio_bimestral"
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno]
                                  .promedio_bimestral
                              }
                              className={styles}
                            />
                          </td>
                          <td>
                            <input
                              className={styles}
                              type="number"
                              name="promedio_final"
                              id=""
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno].promedio_final
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className={styles}
                              name="extraordinario"
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno].extraordinario
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="titulo"
                              className={styles}
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={calificaciones[alumno.id_alumno].titulo}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="insuficiencia"
                              className={styles}
                              onChange={(event) =>
                                this.onChange(alumno.id_alumno, event)
                              }
                              value={
                                calificaciones[alumno.id_alumno].insuficiencia
                              }
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
                    </tbody>
                  </table>
                  {/* <button type="submit" className="btn btn-success">
                    {" "}
                    Calificar
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
