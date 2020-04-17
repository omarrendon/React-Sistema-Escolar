import React, { Component } from "react";
import axios from "axios";

export default class Materia extends Component {
  state = {
    materias: [],
    materia: {
      nombre: "",
      horas: "",
      faltas_permitidas: "",
      fk_maestro: "",
      fk_carrera: ""
    },
    carreras: [],
    maestros: []
  };

  componentDidMount() {
    this.getCarrera();
    this.getMaestro();
    this.getMateria();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data
    });
    console.log(this.state.carreras);
  };

  getMaestro = async () => {
    const response = await axios.get("http://localhost:8080/maestros/listar");
    this.setState({
      maestros: response.data.maestros
    });
    console.log(this.state.maestros);
  };

  getMateria = async () => {
    const response = await axios.get("http://localhost:8080/materias/listar");
    this.setState({
      materias: response.data.data
    });
    console.log(this.state.materias);
  };

  onChange = e => {
    this.setState({
      materia: {
        ...this.state.materia,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = async e => {
    const { nombre, horas, faltas_permitidas, fk_maestro, fk_carrera} = this.state.materia
    e.preventDefault();
    if(nombre === "" || horas === "" || faltas_permitidas === "" || fk_maestro === "" || fk_carrera === "") {
      alert("RELLENAR TODOS LOS CAPOS FALTANTES");
    }else {

      await axios.post("http://localhost:8080/materias/crear", {
        nombre: nombre,
        horas: horas,
        faltas_permitidas: faltas_permitidas,
        fk_maestro: fk_maestro,
        fk_carrera: fk_carrera
      });
      this.getCarrera();
      this.getMaestro();
      this.getMateria();
      this.setState({
        materia: {
          nombre: "",
          horas: "",
          faltas_permitidas: "",
          fk_maestro: "",
          fk_carrera: ""
        }
      })
    }
  };

  deleteUser = async id_materia => {
    await axios.delete(`http://localhost:8080/materias/${id_materia}`);
    this.getMateria();
    console.log("MATERIA ELIMINADA :" + id_materia);
  };

  render() {
    const { nombre, horas, faltas_permitidas, fk_maestro, fk_carrera} = this.state.materia
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body">
            <h3>Registro de Asignaturas</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <br />
                <input
                  value={nombre}
                  type="text"
                  placeholder="Nombre Asignatura"
                  name="nombre"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />

                <input
                  value={horas}
                  type="number"
                  placeholder=" Horas totales de la Asignatura"
                  name="horas"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />

                <input
                  value={faltas_permitidas}
                  type="number"
                  placeholder="Número de faltas permitidas"
                  name="faltas_permitidas"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />

                <label htmlFor="">Licenciatura</label>
                <select
                  value={fk_carrera}
                  name="fk_carrera"
                  className="custom-select"
                  onChange={this.onChange}
                >
                  {this.state.carreras.map(lic => (
                    <option value={lic.id_carrera} key={lic.id_carrera}>
                      {" "}
                      {lic.nombre}
                    </option>
                  ))}
                </select>
                <br />
                <br />

                <label htmlFor="">Docente a impartir la materia</label>
                <select
                  name="fk_maestro"
                  value={fk_maestro}
                  className="custom-select"
                  onChange={this.onChange}
                >
                  {this.state.maestros.map(maestro => (
                    <option value={maestro.id_maestro} key={maestro.id_maestro}>
                      {" "}
                      {maestro.nombres} {maestro.apellido_paterno}{" "}
                      {maestro.apellido_materno}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          {this.state.materias.map(materia => (
            <div className="card bg-light mb-3" key={materia.id_materia}>
              <div className="card-header">{materia.materiaCarrera.nombre}</div>
              <div className="card-body">
                <h5 className="card-title">{materia.nombre}</h5>
                <p className="card-text">
                  <span>
                    {" "}
                    <strong>Docente :</strong>
                    {materia.materiaMaestro.nombres}{" "}
                    {materia.materiaMaestro.apellido_paterno}{" "}
                    {materia.materiaMaestro.apellido_materno}
                  </span>
                  <br />
                  <span>
                    {" "}
                    <strong>Total de Horas : </strong>
                    {materia.horas}
                    {" Horas "}
                  </span>
                  <br />
                  <span>
                    <strong>Faltas Permitidas : </strong>
                    {" "}
                    {materia.faltas_permitidas}
                  </span>
                </p>
                <button className="btn btn-danger" onClick={() => this.deleteUser(materia.id_materia)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}