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
    const carrera = await axios.get("http://localhost:4000/carrera");
    this.setState({
      carreras: carrera.data
    });
    console.log(this.state.carreras);
  };

  getMaestro = async () => {
    const response = await axios.get("http://localhost:4000/maestro");
    this.setState({
      maestros: response.data.maestros
    });
    console.log(this.state.maestros);
  };

  getMateria = async () => {
    const response = await axios.get("http://localhost:4000/materia");
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
    e.preventDefault();
    await axios.post("http://localhost:4000/materia", {
      nombre: this.state.materia.nombre,
      horas: this.state.materia.horas,
      faltas_permitidas: this.state.materia.faltas_permitidas,
      fk_maestro: this.state.materia.fk_maestro,
      fk_carrera: this.state.materia.fk_carrera
    });
  };

  deleteUser = async (id_materia) => {
      await axios.delete(`http://localhost:4000/materia/${id_materia}`);
      this.getMateria();
      console.log('MATERIA ELIMINADA :' + id_materia);
  }

  render() {
    return (
      <div>
        <div className="form">
          <form action="" onSubmit={this.onSubmit}>
            <input
              value={this.state.materia.nombre}
              type="text"
              placeholder="Nombre Asignatura"
              name="nombre"
              onChange={this.onChange}
            />

            <input
              value={this.state.materia.horas}
              type="number"
              placeholder=" Horas totales de la Asignatura"
              name="horas"
              onChange={this.onChange}
            />

            <input
              value={this.state.materia.faltas_permitidas}
              type="number"
              placeholder="Número de faltas permitidas"
              name="faltas_permitidas"
              onChange={this.onChange}
            />

            <label htmlFor="">Licenciatura</label>
            <select
              value={this.state.materia.fk_carrera}
              name="fk_carrera"
              onChange={this.onChange}
            >
              {this.state.carreras.map(lic => (
                <option value={lic.id_carrera} key={lic.id_carrera}>
                  {" "}
                  {lic.nombre}
                </option>
              ))}
            </select>

            <label htmlFor="">Docente a impaertir la materia</label>
            <select
              name="fk_maestro"
              value={this.state.materia.fk_maestro}
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

            <button type="submit">Guardar</button>
          </form>
        </div>
        <div className="list">
          <ul>
            {this.state.materias.map(materia => (
              <div className="data" key={materia.id_materia}>
                <li>
                  <span>
                    {" "}
                    <strong>Asignatura : </strong> {materia.nombre}{" "}
                  </span>
                  <br/>
                  <span>
                    {" "}
                    <strong>Total deHoras : </strong> {materia.horas}{" "}
                  </span>
                  <br/>
                  <span>
                    {" "}
                    <strong>Faltas Permitidas : </strong>{" "}
                    {materia.faltas_permitidas}
                  </span>
                  <br/> 
                  <span>
                    {" "}
                    <strong>Licenciatura : </strong>{" "}
                    {materia.materiaCarrera.nombre}
                  </span>
                  <br/>
                  <span>
                    {" "}
                    <strong>Docente : </strong> {materia.materiaMaestro.nombres}{" "}
                    {materia.materiaMaestro.apellido_paterno}{" "}
                    {materia.materiaMaestro.apellido_materno}
                  </span>
                </li>
                <button onClick={() => this.deleteUser(materia.id_materia)}>Eliminar</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
