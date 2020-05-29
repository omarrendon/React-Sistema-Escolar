import React, { Component } from "react";
import axios from "axios";

export default class AlumnoMateria extends Component {
  state = {
    maestros : [],
    carreras : [],
    materias: [],
    content: [],
    periodos : [],
    grupos : [],
    datos :{
      id_materia : "",
      id_maestro : "",
      id_grupo : "",
      id_carrera : ""
    }
  };

  componentDidMount() {
    this.getMateria();
    this.getAlumnoMateria();
    this.getMaestro();
    this.getCarrera();
    this.getPeriodo();
    this.getGrupo();
  }
  
  getGrupo = async() => {
    const response = await axios.get("http://localhost:8080/grupos/listar")
    this.setState({
      grupos : response.data
    })
    console.log("Grupos");
    console.log(this.state.grupos);
    
  }

  getPeriodo = async() => {
    const response = await axios.get("http://localhost:8080/periodos/listar");
    this.setState({
      periodos : response.data
    });
    console.log("PERIODOS");
    console.log(this.state.periodos);
  }

  getCarrera = async() => {
    const response = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras : response.data
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  }

  getMaestro = async() => {
    const response = await axios.get("http://localhost:8080/maestros/listar");
    this.setState({
      maestros : response.data
    })
    console.log("Mastros");
    console.log(this.state.maestros);
  } 

  getMateria = async () => {
    const response = await axios.get("http://localhost:8080/materias/listar");
    this.setState({
      materias: response.data
    });
    console.log("MATERIAS");
    console.log(this.state.materias);
  };

  getAlumnoMateria = async () => {
    const response = await axios.get("http://localhost:8080/documentosGenerados/listar");
    this.setState({
      content: response.data
    });
    console.log("CONTENIDO documento generado");
    console.log(this.state.content);
  };

  onChange = e => {
    this.setState({
      datos : {
        ...this.state.datos,
        [e.target.name] : e.target.value
      }
      // Alumno_Materia: {
      //   ...this.state.Alumno_Materia,
      //   [e.target.name]: e.target.value
      // }
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set('id_maestro' , data.get('id_maestro'));
    data.set('id_materia' , data.get('id_materia'));
    data.set('id_carrera' , data.get('id_carrera'));
    data.set('id_maestro' , data.get('id_maestro'));

    const imprimir = await axios.get(`http://localhost:8080/documentosGenerados/imprimir/${this.state.datos.id_materia}-${this.state.datos.id_maestro}-${this.state.datos.id_grupo}-${this.state.datos.id_carrera}`)
    
    console.log(imprimir.data);
    
    
  
  }
  

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12">
            <h2>Generar Boleta</h2>
            <div className="dropdown-divider"></div>
            <div className="card card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <span>
                    <strong>Catedrático</strong>
                  </span>
                  <select
                    name="id_maestro"
                    value={this.state.datos.id_maestro}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.maestros.map(maestro => (
                      <option value={maestro.id_maestro} key={maestro.id_maestro}>
                        {maestro.nombres} {maestro.apellido_paterno}{" "}
                        {maestro.apellido_materno}
                      </option>
                    ))}
                  </select>
                  <span>
                    <strong>Asignatura</strong>
                  </span>
                  <select
                    name="id_materia"
                    value={this.state.datos.id_materia}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.materias.map(materia => (
                      <option
                        value={materia.id_materia}
                        key={materia.id_materia}
                      >
                        {materia.nombre}
                      </option>
                    ))}
                  </select>

                  <span>
                    <strong>Licenciatura</strong>
                  </span>
                  <select
                    name="id_carrera"
                    value={this.state.datos.id_carrera}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.carreras.map(carrera => (
                      <option value={carrera.id_carrera} key={carrera.id_carrera}>
                        {carrera.nombre}
                      </option>
                    ))}
                  </select>
                  
                  <span>
                    <strong>Grupo</strong>
                  </span>
                  <select
                    name="id_grupo"
                    value={this.state.datos.id_grupo}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.grupos.map(grupo => (
                      <option value={grupo.id_grupo} key={grupo.id_grupo}>
                        {grupo.clave_grupo}
                      </option>
                    ))}
                  </select>

                  <div className="dropdown-divider"></div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    
                  >
                    Imprimir
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <h2>Imprimir Boleta</h2>
            <div className="dropdown-divider"></div>

          </div>
        </div>
      </div>
    );
  }
}
