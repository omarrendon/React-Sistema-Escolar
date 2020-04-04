import React, { Component } from "react";
import axios from "axios";

export default class Alumno extends Component {
  state = {
    users: [],
    alumno: {
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      matricula: "",
      fk_carrera: ""
    },
    carreras: []
  };

  componentDidMount() {
    this.getData();
    this.getCarrera();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:4000/carrera");
    // this.state.carreras = carrera.data;
    this.setState({
      carreras: carrera.data
    });

    console.log(this.state.carreras);
  };

  onChange = e => {
    this.setState({
      alumno: {
        ...this.state.alumno,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/alumno", {
      nombres: this.state.alumno.nombres,
      apellido_paterno: this.state.alumno.apellido_paterno,
      apellido_materno: this.state.alumno.apellido_materno,
      matricula: this.state.alumno.matricula,
      fk_carrera: this.state.alumno.fk_carrera
      // carrera : this.state.alumno.carrera
    });
    this.getData();
  };

  getData = async () => {
    const response = await axios.get("http://localhost:4000/alumno");
    this.setState({
      users: response.data
    });
    console.log(this.state.users);
    // console.log(this.state.carreras)
  };

  render() {
    return (
      <div>
        <div className="form">
          <h2>REGISTRO DE ALUMNOS</h2>
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.alumno.nombres}
              type="text"
              placeholder="Nombres"
              name="nombres"
              onChange={this.onChange}
            />

            <input
              value={this.state.alumno.apellido_paterno}
              type="text"
              placeholder=" Apellido Paterno"
              name="apellido_paterno"
              onChange={this.onChange}
            />

            <input
              value={this.state.alumno.apellido_materno}
              type="text"
              placeholder="Apellido Materno"
              name="apellido_materno"
              onChange={this.onChange}
            />

            <select
              value={this.state.alumno.fk_carrera}
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

            <input
              value={this.state.alumno.matricula}
              type="text"
              placeholder="Matricula"
              name="matricula"
              onChange={this.onChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>

        <div className="lista">
          <h2>LISTA DE ALUMNOS</h2>
          <ul>
            {this.state.users.map(usuario => (
              <li key={usuario.nombres}>
                <span> Nombre : {usuario.nombres} </span>
                <br />
                <span> Apellido Paterno : {usuario.apellido_paterno} </span>
                <br />
                <span> Apellido Materno : {usuario.apellido_materno} </span>
                <br />
                <span> Matricula : {usuario.matricula} </span>
                <br />
                <span> Licenciatura : {usuario.carrera.nombre} </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
