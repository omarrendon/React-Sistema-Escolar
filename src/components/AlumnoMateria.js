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
      Alumno_Materia: {
        ...this.state.Alumno_Materia,
        [e.target.name]: e.target.value
      }
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
    
    
    // await axios.post("http://localhost:8080/documentosGenerados/crear", data);
    //   console.log("Boleta Creada");

  }
  

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-12">
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





                  {/* <span>
                    <strong>Periodo Escolar</strong>
                  </span>
                  <select
                    name="fk_periodo"
                    value={this.state.periodos.id_periodo}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.periodos.map(periodo => (
                      <option value={periodo.id_periodo} key={periodo.id_periodo}>
                        {periodo.periodo} - {periodo.anio}
                      </option>
                    ))}
                  </select> */}
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
            {/* <h2>Imprimir Boleta</h2> */}
            <div className="dropdown-divider"></div>

            {/* <div className="row row-cols-1 row-cols-md-3">
              {this.state.content.map(boleta => (
                <div
                  className="card text-center bg-light mb-3"
                  key={boleta.id_alumno_materia}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <span>
                        <strong>Alumno : </strong> {boleta.aluAlumno.nombres}{" "}
                        {boleta.aluAlumno.apellido_paterno}{" "}
                        {boleta.aluAlumno.apellido_materno}
                      </span>
                      <br />
                      <span>
                        <strong>Asignaruta : </strong>{" "}
                        {boleta.aluMateria.nombre}
                      </span>
                    </h5>
                    <p className="card-text">
                      <span>
                        {" "}
                        <strong>Horas Totales : </strong>{" "}
                        {boleta.aluMateria.horas}
                      </span>
                      <br />

                      <span>
                        {" "}
                        <strong>Faltas Permitidas : </strong>{" "}
                        {boleta.aluMateria.faltas_permitidas}
                      </span>
                      <br />

                      <span>
                        {" "}
                        <strong>Faltas Totales : </strong>{" "}
                        {boleta.faltas_permitidas}
                      </span>
                      <br />

                      <span>
                        {" "}
                        <strong>Grupo : </strong>
                        {boleta.aluGrupo.clave_grupo} - {boleta.aluGrupo.turno}
                      </span>
                      <br />
                      <span>
                        {" "}
                        <strong>Calificaciones : </strong>
                        <br />
                        <span>- Primer Bimestre </span>
                        {boleta.aluCalificaciones.bimestre_uno}
                        <br />
                        <span>- Segundo Bimestre </span>
                        {boleta.aluCalificaciones.bimestre_dos}
                        <br />
                        <span>- Ordinario </span>
                        {boleta.aluCalificaciones.ordinario}
                        <br />
                        <span>- Promedio Bimestral </span>
                        {boleta.aluCalificaciones.promedio_bimestral}
                        <br />
                        <span>- Promedio Final </span>
                        {boleta.aluCalificaciones.promedio_final}
                        <br />
                        <span>- Extraordinario </span>
                        {boleta.aluCalificaciones.extraordinario}
                        <br />
                        <span>- Título </span>
                        {boleta.aluCalificaciones.titulo}
                        <br />
                        <span>- Insuficiencia </span>
                        {boleta.aluCalificaciones.insuficiencia}
                        <br />
                      </span>
                      <button className="btn btn-primary">Imprimir</button>
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
