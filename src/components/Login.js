import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    users: [],
    alumno: {
      user: "",
      pass: "",
      id_alumo: null,
    },
  };

  onSubmit = async (e) => {
    const { user, pass } = this.state.alumno;
    e.preventDefault();

    const data = new FormData(e.target);

    data.set("user", data.get("user"));
    data.set("pass", data.get("pass"));
    if (user === "" || pass === "") {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:8080/Alumno/login", data);
      this.getAlumno(user, pass);
      //this.getData();
      this.setState({
        alumno: {
          user: "",
          pass: "",
        },
      });
    }
  };
  component;
  DidMount() {
    this.getData();
  }

  onChange = (e) => {
    this.setState({
      alumno: {
        ...this.state.alumno,
        [e.target.name]: e.target.value,
      },
    });
  };

  getAlumno = async (user, pass) => {
    const response = await axios.get(
      `http://localhost:8080/Alumno/listar?usuario=${user}&pass=${pass}`
    );
    this.setState({
      users: response.data,
    });
    console.log("ALUMNO");
    console.log(this.state.users);
  };

  render() {
    return (
      <div className="container p-4">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="card card-body">
              <h3 className="text-center">Buscar Calificaciones</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <br />
                  <input
                    value={this.state.alumno.usuario}
                    type="text"
                    placeholder="Usuario"
                    name="user"
                    onChange={this.onChange}
                    className="form-control"
                  />
                  <br />
                  <input
                    value={this.state.alumno.pass}
                    type="text"
                    placeholder=" Password"
                    name="pass"
                    onChange={this.onChange}
                    className="form-control"
                  />
                  <hr />
                  <button type="submit" className="btn btn-success">
                    Buscar
                  </button>
                </div>
              </form>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-12 col-sm-12 col-md-12">
                <div className="list-group">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col"> Nombres</th>
                        <th scope="col"> Apellido Paterno</th>
                        <th scope="col"> Apellido Materno</th>
                        <th scope="col"> Matricula</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((usuario) => (
                        <tr key={usuario.id_alumno}>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.apellido_paterno}</td>
                          <td>{usuario.apellido_materno}</td>
                          <td>{usuario.matricula}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
