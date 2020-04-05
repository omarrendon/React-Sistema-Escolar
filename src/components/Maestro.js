import React, { Component } from "react";
import axios from "axios";

export default class Maestro extends Component {
  state = {
    maestros: [],
    maestro: {
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      matricula: "",
      contrasenia: ""
    }
  };

  componentDidMount() {
    this.getMaestros();
  }

  getMaestros = async () => {
    const response = await axios.get("http://localhost:4000/maestro");
    this.setState({
        maestros : response.data.maestros
    });
    console.log(this.state.maestros);
  };

  onChange = e => {
    this.setState({
      maestro : {
        ...this.state.maestro , 
        [e.target.name]:  e.target.value
      }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/maestro", {
      nombres: this.state.maestro.nombres,
      apellido_paterno: this.state.maestro.apellido_paterno,
      apellido_materno: this.state.maestro.apellido_materno,
      matricula: this.state.maestro.matricula,
      contrasenia: this.state.maestro.contrasenia
    });
    this.getMaestros();
  };

  deleteUser = async (id_maestro) => {
    await axios.delete(`http://localhost:4000/maestro/${id_maestro}`);
    this.getMaestros();
    console.log('USUARIO ELIMINADO :' + id_maestro);
  }

  render() {
    return (
      <div className="container">
        <div className="registro">
          <h2>RESGISTRO DE DOCENTE</h2>
          <form className="form" onSubmit={this.onSubmit}>
            <input
              value={this.state.maestro.nombres}
              type="text"
              placeholder="Nombres"
              name="nombres"
              onChange={this.onChange}
            />

            <input
              value={this.state.maestro.apellido_paterno}
              type="text"
              placeholder=" Apellido Paterno"
              name="apellido_paterno"
              onChange={this.onChange}
            />

            <input
              value={this.state.maestro.apellido_materno}
              type="text"
              placeholder="Apellido Materno"
              name="apellido_materno"
              onChange={this.onChange}
            />

            <input
              value={this.state.maestro.matricula}
              type="text"
              placeholder="Matricula"
              name="matricula"
              onChange={this.onChange}
            />

            <input
              value={this.state.maestro.contrasenia}
              type="password"
              placeholder=" Contraseña "
              name="contrasenia"
              onChange={this.onChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>
        <div className="map">
          {
            this.state.maestros.map( (maestro) =>(
              <div className="lista" key={maestro.id_maestro}>
              <li >
                <span>Nombres : {maestro.nombres}</span>
                <br/>
                <span>Apellido Paterno : {maestro.apellido_materno}</span>
                <br/>
                <span>Apellido Materno : {maestro.apellido_paterno}</span>
                <br/>
                <span>Matricula : {maestro.matricula}</span>
              </li>
              <button  onClick={ () => this.deleteUser(maestro.id_maestro)}>Eliminar</button>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
