import React, { Component } from "react";
import axios from "axios";
import {Snackbar} from "./snackbar/Snackbar";

export default class Maestro extends Component {
  snackbarRef = React.createRef();
  
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
    const response = await axios.get("http://localhost:8080/maestros/listar");
    this.setState({
      maestros: response.data
    });
    console.log(this.state.maestros);
  };

  onChange = e => {
    this.setState({
      maestro: {
        ...this.state.maestro,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = async e => {
    const { nombres, apellido_paterno, apellido_materno, matricula, contrasenia} = this.state.maestro;
    e.preventDefault();
    
    const data = new FormData(e.target);
    data.set('nombres' , data.get('nombres'));
    data.set('apellido_paterno' , data.get('apellido_paterno'));
    data.set("apellido_materno" , data.get("apellido_materno"));
    data.set("matricula" , data.get("matricula"));
    data.set("contrasenia" , data.get('contrasenia'));
    
    if ( nombres === "" || apellido_paterno === "" || apellido_materno === "" || 
        matricula === "" || contrasenia === "") {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:8080/maestros/crear", data);
      this.snackbarRef.current.openSnackBar('Profesor Agregado Exitosamente..');
      this.getMaestros();
      this.setState({
        maestro: {
          nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          matricula: "",
          contrasenia: ""
        }
      })
    }
  };

  deleteUser = async(id_maestro) => {
    await axios.get(`http://localhost:8080/maestros/borrar/${id_maestro}`);
    this.snackbarRef.current.openSnackBar('Profesor Eliminado...');
    this.getMaestros();
    console.log("USUARIO ELIMINADO :" + id_maestro);
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4">
          <div className="card card-body">
            <h3>RESGISTRO DOCENTE</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <br />
                <input
                  value={this.state.maestro.nombres}
                  type="text"
                  placeholder="Nombres"
                  name="nombres"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                  value={this.state.maestro.apellido_paterno}
                  type="text"
                  placeholder=" Apellido Paterno"
                  name="apellido_paterno"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <input
                  value={this.state.maestro.apellido_materno}
                  type="text"
                  placeholder="Apellido Materno"
                  name="apellido_materno"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <input
                  value={this.state.maestro.matricula}
                  type="text"
                  placeholder="Matricula"
                  name="matricula"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <input
                  value={this.state.maestro.contrasenia}
                  type="text"
                  placeholder=" Contraseña "
                  name="contrasenia"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-8  col-sm-12 col-md-8">
          <table className="table">
          <thead className="thead-dark">
                <tr>
                  <th scope="col"> Nombres</th>
                  <th scope="col"> Apellido Paterno</th>
                  <th scope="col"> Apellido Materno</th>
                  <th scope="col"> Licenciatura</th>
                  <th scope="col"> Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.maestros.map( (maestro) => (
                    <tr key={maestro.id_maestro}>
                      <td>{maestro.nombres}</td>
                      <td>{maestro.apellido_paterno}</td>
                      <td>{maestro.apellido_materno}</td>
                      <td>{maestro.matricula}</td>
                      <td>
                      <button  className="btn btn-danger" onClick={ () => this.deleteUser(maestro.id_maestro)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              <Snackbar ref={this.snackbarRef}/>
          </table>
        </div>
      </div>
    );
  }
}
