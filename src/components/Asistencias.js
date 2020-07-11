import React, { Component } from "react";
// import React, { useState } from "react";
import axios from "axios";
import { Snackbar } from "./snackbar/Snackbar";
import "./styles/Asistencias.css";

// function Asistencias() {
  
//   const [appState, changeState]
//   const [carreras, setCarreras] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [asistencias, setAsistencias] = useState([]);
//   const [carreraGrupos, setCarreraGrupos] = useState([]);
//   const [materiaGrupo, setMateriaGrupo] = useState([]);
//   const [alumnoGrupo, setAlumnoGrupo] = useState([]);
//   const [asistenciaData, setAsistenciaData] = useState({
//     numero_asistencias: "",
//     fk_materia: "",
//     fk_alumno: "",
//   });

// }

export default class Asistencias extends Component {
  snackbarRef = React.createRef();

  state = {

    colorState:{
      activeObj: null,
    },
    carreraGrupos: [],

    carreras: [],
    users: [],
    asistencias: [],
    materiaGrupo: [],
    alumnoGrupo: [],

    asistenciasData: {
      numero_asistencias: "",
      fk_materia: "",
      fk_alumno: "",
    },
    color: 'red',
    othercolor: 'blue'
  };

  componentDidMount() {
    this.getCarrera();
    this.getAsistencias();
    this.getGrupoByCarrea()
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data,
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  };

  getGrupoByCarrea = async (id_carrera, index) => {
    console.log(id_carrera);
    console.log(index+1);
    
    const idCarrera = await axios.get(
      "http://localhost:8080/carreras/grupos?id_carrera=" + id_carrera
    );
    this.setState({
      carreraGrupos: idCarrera.data,
      colorState: {
        ...this.state.colorState, activeObj: id_carrera
      }
    });
    
    console.log("CARRERAS_GRUPOS");
    console.log(this.state.carreraGrupos);
  };
  
  changeStyle = (id_carrera, index) =>{
    const newIndex = index+1;
    console.log(newIndex);
    console.log(this.state.carreraGrupos[id_carrera]);
    
    if(id_carrera === this.state.colorState.activeObj){
      return "active list-group-item"
    }else {
      return "inactive list-group-item"
    }
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
      "http://localhost:8080/materias/list_alu2?id_materia=" + id_materia
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

    const data = new FormData(event.target);

    data.set("fk_alumno", data.get("fk_alumno"));
    data.set("numero_asistencias", data.get("numero_asistencias"));
    data.set("fk_materia", data.get("fk_materia"));

    console.log("NUMEROSSS! " + numero_asistencias, fk_materia, fk_alumno);
    if (numero_asistencias === "" || fk_materia === "" || fk_alumno === "") {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:8080/asistencias/crear", data);
      this.snackbarRef.current.openSnackBar(
        "Asistencia Creada Correctamente..."
      );
      this.setState({
        asistenciasData: {
          numero_asistencias: 0,
          fk_materia: "",
          fk_alumno: "",
        },
      });
    }
  };

  render() {

    return (
      <div className="container p-4">
        <p className="h2 text-center">Calificar Asistencias</p>

        <div className="row justify-content-md-center">

          {/* SELECCIONAR LICENCIATURA */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <p className="h3 text-center">Seleccionar Licenciatura</p>
              <hr />
              <ul className=" list-group">
                {this.state.carreras.map((carrera, index) => (
                  <li
                    // className="list-group-item"
                    className={this.changeStyle(carrera.id_carrera, index)}
                    // style={() => this.getGrupoByCarrea(index)} 
                    key={carrera.id_carrera}
                    onClick={() => this.getGrupoByCarrea(carrera.id_carrera, index)}

                    // style={ index+1 === carrera.id_carrera ? { background: this.state.color} : { background: this.state.othercolor }}

                  >
                    {carrera.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SELECCIONAR GRUPO */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <p className="h3 text-center">Seleccionar Grupo</p>
              <hr />
              <div className="container">
                {this.state.carreraGrupos.map((id) => (
                  <div
                    className="card card-body"
                    key={id.clave_grupo}
                    onClick={() => this.getMateriasByGruop(id.id_grupo)}
                  >
                    <p>GRUPO : {id.clave_grupo}</p>
                    <p>CLAVE CARRERA : {id.clave_cuatrimestre}</p>
                    <p>AULA : {id.aula}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SELCCIONAR MATERIAS */}
          <div className="col-12 col-md-4 col-sm-12">
            <div className="card card-body">
              <p className="h3 text-center">Seleccionar Asignatura</p>
              <hr />
              <div className="container">
                {this.state.materiaGrupo.map((materia) => (
                  <>
                    <div
                      className="card card-body"
                      key={materia.nombre}
                      onClick={() =>
                        this.getAlumnosByMateria(materia.id_materia)
                      }
                    >
                      <p>MATERIAS : {materia.nombre}</p>
                    </div>
                    <br />
                  </>
                ))}
                <p>Asiganar Asistencias</p>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* FORMULARIO */}
        <div className="row justify-content-md-center">
          <p className="h2 text-center">CALIFICAR ALUMNO</p>
        </div>
        <hr />
        <br />
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-12 col-sm-12">
            <div className="card card-body">
              <div className="container">
                <div className="dropdown-divider"></div>

                <form className="form-group" onSubmit={this.onSubmit}>
                  <select
                    value={this.state.asistenciasData.fk_alumno}
                    number={this.state.asistenciasData.fk_alumno}
                    name="fk_alumno"
                    type="number"
                    onChange={this.onChange}
                    className="custom-select"
                  >
                    <option value="">Seleccionar Alumno...</option>
                    {this.state.alumnoGrupo.map((alumno) => (
                      <option value={alumno.id_alumno} key={alumno.id_alumno}>
                        {alumno.nombre} {alumno.apellido_pat}{" "}
                        {alumno.apellido_mat}
                      </option>
                    ))}
                  </select>

                  <br />
                  <br />

                  <input
                    value={this.state.asistenciasData.numero_asistencias}
                    type="number"
                    name="numero_asistencias"
                    placeholder="Número de Asistencias"
                    onChange={this.onChange}
                    className="form-control"
                    min="0"
                    max="80"
                  />

                  <br />

                  <select
                    value={this.state.asistenciasData.fk_materia}
                    name={"fk_materia"}
                    type="number"
                    onChange={this.onChange}
                    className="custom-select"
                  >
                    <option value="">Seleccionar Materia...</option>
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
                    Calificar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Snackbar ref={this.snackbarRef} />
      </div>
    );
  }
}
