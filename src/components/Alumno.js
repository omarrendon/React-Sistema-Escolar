import React, { Component } from "react";
import axios from "axios";
import Style from "./styles/alumno.module.css";

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

  

  getData = async () => {
    const response = await axios.get("http://localhost:4000/alumno");
    this.setState({
      users: response.data
    });
    console.log(this.state.users);
  };

  onSubmit = async e => {
    const { nombres, apellido_paterno, apellido_materno, matricula, fk_carrera} = this.state.alumno;
    e.preventDefault();
    
    if ( nombres === "" || apellido_paterno === "" || apellido_materno === "" || 
        matricula === "" ) {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:4000/alumno", {
        nombres: nombres,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        matricula: matricula,
        fk_carrera: fk_carrera
      });
      this.getData();
      this.setState({
        alumno: {
          nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          matricula: "",
          fk_carrera: ""
        }
      })
    }
  };

  deleteUser = async id_alumo => {
    await axios.delete(`http://localhost:4000/alumno/${id_alumo}`);
    this.getData();
    console.log("USUARIO ELIMINADO :" + id_alumo);
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <div className="card card-body">
            <h3>REGISTRO DE ALUMNOS</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <br />
                <input
                  className={Style.formgroup}
                  value={this.state.alumno.nombres}
                  type="text"
                  placeholder="Nombres"
                  name="nombres"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                  className={Style.formgroup}
                  value={this.state.alumno.apellido_paterno}
                  type="text"
                  placeholder=" Apellido Paterno"
                  name="apellido_paterno"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                  className={Style.formgroup}
                  value={this.state.alumno.apellido_materno}
                  type="text"
                  placeholder="Apellido Materno"
                  name="apellido_materno"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                  className={Style.formgroup}
                  value={this.state.alumno.matricula}
                  type="text"
                  placeholder="Matricula"
                  name="matricula"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <select
                  className={Style.formgroup}
                  value={this.state.alumno.fk_carrera}
                  name="fk_carrera"
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {this.state.carreras.map(lic => (
                    <option value={lic.id_carrera} key={lic.id_carrera}>
                      {" "}
                      {lic.nombre}
                    </option>
                  ))}
                </select>
                <br />
                <div class="dropdown-divider"></div>
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="list-group">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"> Nombres</th>
                  <th scope="col"> Apellido Paterno</th>
                  <th scope="col"> Apellido Materno</th>
                  <th scope="col"> Licenciatura</th>
                  <th scope="col"> Matricula</th>
                  <th scope="col"> Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(usuario => (
                  <tr key={usuario.id_alumo}>
                    <td>{usuario.nombres}</td>
                    <td>{usuario.apellido_paterno}</td>
                    <td>{usuario.apellido_materno}</td>
                    <td>{usuario.matricula}</td>
                    <td>{usuario.carrera.nombre}</td>
                    <td>
                      <button
                        onClick={() => this.deleteUser(usuario.id_alumo)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
