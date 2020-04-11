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
      maestros: response.data.maestros
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

  deleteUser = async id_maestro => {
    await axios.delete(`http://localhost:4000/maestro/${id_maestro}`);
    this.getMaestros();
    console.log("USUARIO ELIMINADO :" + id_maestro);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
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
                  type="password"
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
        <div className="col-md-8">
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
          </table>
        </div>
      </div>
    );
  }
}
//   <div className="map">
//     {
//       this.state.maestros.map( (maestro) =>(
//         <div className="lista" key={maestro.id_maestro}>
//         <li >
//           <span>Nombres : {maestro.nombres}</span>
//           <br/>
//           <span>Apellido Paterno : {maestro.apellido_materno}</span>
//           <br/>
//           <span>Apellido Materno : {maestro.apellido_paterno}</span>
//           <br/>
//           <span>Matricula : {maestro.matricula}</span>
//         </li>
//         <button  onClick={ () => this.deleteUser(maestro.id_maestro)}>Eliminar</button>
//         </div>
//       ))
//     }
//   </div>
// </div></div>
