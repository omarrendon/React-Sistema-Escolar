import React, { Component } from "react";
import axios from "axios";

export default class Asistencias extends Component {
  state = {
    carreras: [],
    users: [],
    asistencias: [],
  };

  componentDidMount() {
    this.getCarrera();
    this.getAlumno();
    this.getAsistencias();
  }

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    // this.state.carreras = carrera.data;
    this.setState({
      carreras: carrera.data,
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  };

  getAlumno = async () => {
    const response = await axios.get("http://localhost:8080/alumnos/listar");
    this.setState({
      users: response.data,
    });
    console.log("alumnos");

    console.log(this.state.users);
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
  

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body">
            <p className="h3">Seleccionar Licenciatura</p>
            <form onSubmit={this.handleSubmit}> 
              <div className="form-gropup">
                <select
                  className="custom-select"
                  name="carreras"
                  // value={this.state.carreras}
                  // onChange={this.onChange}
                >
                  {this.state.carreras.map((carrera) => (
                    <option
                      value={carrera.id_carrera}
                      key={carrera.id_carrera}
                    >
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
                <div className="dropdown-divider"></div>
                <button type="submit" className="btn btn-success">
                Guardar
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="dropdown-divider"></div>
      
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body">
            <p className="h3">Sleccionar Grupo</p>

          </div>
        </div>
      </div>
    </div>
    );
  }
}
