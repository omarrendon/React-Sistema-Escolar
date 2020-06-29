import React, { Component } from "react";
import axios from "axios";
import {  Redirect } from 'react-router-dom';

export default class Login extends Component {
  state = {
    administadores: [],

    admin: {
      matricula: "",
      contrasenia: "",
    //   nombres:"",
    //   id_administrador: null,
    },
  };

//   component;
  componentDidMount() {
    this.getAdministrador();
  }

  getAdministrador = async (e) => {
    const response = await axios.get("http://localhost:8080/administrador/listar");
    this.setState({
        administadores: response.data
    });
    console.log("ADMINISTRADORES");
    console.log(this.state.administadores);
    

    //  const {matricula,pass} = this.state.administrador;
    // // e.preventDefault();
    // const administrador = await axios.get(
    //   "http://localhost:8080/administrador/listar"
    // );
    // this.setState({
    //   users: administrador.data,
    // });
    // console.log("ADMINISTRADOR");
    // this.state.users.map((administrador) => (
    //     this.matricula=administrador.matricula,
    //     this.contrasenia=administrador.contrasenia
    // ))
    // console.log(this.matricula);
    // console.log(this.contrasenia);
    
    // if(matricula===this.matricula && this.contrasenia===this.contrasenia){
    //     console.log("LOGEADO")
        
    // }else{
    //     console.log("ERROR")
    // }
  };
  
  onSubmit = async (e) => {
    const { contrasenia, matricula } = this.state.admin;

    e.preventDefault();
    console.log("matricula :" + matricula + " contrasenia : " + contrasenia);
    
    const data = new FormData(e.target);
    data.set("matricula", data.get("matricula"));
    data.set("contrasenia", data.get("contrasenia"));

    if(matricula === "" || contrasenia === "") {
        alert("INGRESAR LOS CAMPOS VACIOS");
    } else {
      
            // window.location.assign("http://localhost:3000/")
           return this.props.history.push('/alumno/')
       
    }


  };
//   Enviar = (e) => {
//     e.preventDefault();

//     console.log(e.target);
//     this.props.history.push('/alumno/')
//   }

  onChange = (e) => {
    this.setState({
      admin: {
        ...this.state.admin,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <div className="container p-4">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="card card-body">
              <h3 className="text-center">Ingresar al Sistema</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <br />
                  <input
                    value={this.state.admin.matricula}
                    type="text"
                    placeholder="Usuario"
                    name="matricula"
                    onChange={this.onChange}
                    className="form-control"                    
                  />
                  <br />
                  <input
                    value={this.state.admin.contrasenia}
                    type="password"
                    placeholder=" Password"
                    name="contrasenia"
                    onChange={this.onChange}
                    className="form-control"
                  />
                  <hr />
                  {/* <button  className="btn btn-success" onClick={this.Enviar}> */}
                  <button  className="btn btn-success" type="submit">

                    Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
