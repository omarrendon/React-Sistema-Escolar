import React, { Component } from "react";
import axios from "axios";


export default class Alumno extends Component {
  state = {
    users: [],
    alumno: {
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      matricula: "",
      fk_carrera: "",
      fk_grupo: "",
      users : "",
      pass : ''
    },
    carreras: [],
    grupos : [],
    editar : false
  }; 

  componentDidMount() {
    this.getData();
    this.getCarrera();
    this.getGrupo();
  }

  getGrupo = async () => {
    const grupo = await axios.get("http://localhost:8080/grupos/listar")
    this.setState({
      grupos : grupo.data
    });
    console.log("GRUPOS");
    console.log(this.state.grupos);
  }; 

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data
    });
    console.log("CARRERAS");
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
    const response = await axios.get("http://localhost:8080/alumnos/listar");
    this.setState({
      users: response.data
    });
    console.log("ALUMNOS");
    console.log(this.state.users);
  };


  onSubmit = async e => {
    const { nombre, apellido_paterno, apellido_materno, matricula, users, pass} = this.state.alumno;
    e.preventDefault();
    
    const data = new FormData(e.target);
   
    data.set('nombre' , data.get('nombre'));
    data.set('apellido_paterno' , data.get('apellido_paterno'));
    data.set("apellido_materno" , data.get("apellido_materno"));
    data.set("matricula" , data.get("matricula"));
    data.set("users" , data.get("users"));
    data.set("pass" , data.get("pass"));
    data.set("fk_grupo" , data.get("fk_grupo"));
    data.set("fk_carrera" , data.get('fk_carrera'));

    if ( nombre === "" || apellido_paterno === "" || apellido_materno === "" || 
        matricula === "" || users === "" || pass === "" ) {
      alert("RELLENAR LOS CAMPOS VACIOS ");
    } else {
      await axios.post("http://localhost:8080/alumnos/crear", data);
      this.getData();
      this.setState({
        alumno: {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          matricula: "",
          fk_carrera: "",
          fk_grupo: "",
          users : "", 
          pass : ""
        }
      });
    }
  };

  deleteUser = async(id_alumno) => {
    await axios.get(`http://localhost:8080/alumnos/borrar/${id_alumno}`)
    this.getData();
    console.log("USUARIO ELIMINADO :" + id_alumno);
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-5">
          <div className="card card-body">
            <h3>REGISTRO DE ALUMNOS</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <br />
                
                <input
                  value={this.state.alumno.nombre}
                  type="text"
                  placeholder="Nombres"
                  name="nombre"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                  
                  value={this.state.alumno.apellido_paterno}
                  type="text"
                  placeholder=" Apellido Paterno"
                  name="apellido_paterno"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input
                
                  value={this.state.alumno.apellido_materno}
                  type="text"
                  placeholder="Apellido Materno"
                  name="apellido_materno"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />
                <input              
                  value={this.state.alumno.matricula}
                  type="text"
                  placeholder="Matricula"
                  name="matricula"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br/>

                <input     
                  value={this.state.alumno.users}
                  type="text"
                  placeholder="Usuario del Alumno"
                  name="users"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br/>

                <input
                 
                  value={this.state.alumno.pass}
                  type="text"
                  placeholder="Contrasena del Alumno"
                  name="pass"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br/>

                <select
                  value={this.state.alumno.fk_grupo}
                  name={"fk_grupo"}
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {this.state.grupos.map( (grupo) => (
                    <option value={grupo.id_grupo} key={grupo.id_grupo}>
                      {" "}
                      {grupo.clave_grupo}
                      {" "}
                      {grupo.clave_cuatrimestre}
                      {" "}
                      {grupo.turno}
                    </option>
                  ))}
                </select>
             
                <br />
                <br />
                <select
                 
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

                <div className="dropdown-divider"></div>
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        
        
        <hr/>
        
        <div className="col-12 col-sm-12 col-md-7">
          <div className="list-group">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"> Nombres</th>
                  <th scope="col"> Apellido Paterno</th>
                  <th scope="col"> Apellido Materno</th>
                  <th scope="col"> Licenciatura</th>
                  <th scope="col"> Matricula</th>
                  <th scope="col"> Grupo</th>
                  <th scope="col"> Eliminar</th>
                  {/* <th scope="col"> Editar</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(usuario => (
                  <tr key={usuario.id_alumno}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido_pat}</td>
                    <td>{usuario.apellido_mat}</td>
                    <td>{usuario.nombre_carrera}</td>
                    <td>{usuario.matricula}</td>
                    <td>{usuario.clave_grupo}</td>
                    <td>
                      <button
                        onClick={() => this.deleteUser(usuario.id_alumno)}
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
