import React, { Component } from "react";
import axios from "axios";

export default class AlumnoMateria extends Component {
  state = {
    alumnos: [],
    grupos: [],
    calificaciones: [],
    materias: [],
    Alumno_Materia: {
      fk_alumno: "",
      fk_materia: "",
      fk_grupo: "",
      fk_calificion: "",
      faltas_totales : ""
    }
  };

  componentDidMount() {
    this.getAlumnos();
    this.getMateria();
    this.getGrupos();
    this.getCalificaciones();
  }

  getCalificaciones = async () => {
    const response = await axios.get("http://localhost:4000/calificacion");
    this.setState({
      calificaciones: response.data.data
    });
    console.log(this.state.calificaciones);
  };
  getGrupos = async () => {
    const response = await axios.get("http://localhost:4000/grupo");
    this.setState({
      grupos: response.data.data
    });
    console.log(this.state.grupos);
  };

  getAlumnos = async () => {
    const response = await axios.get("http://localhost:4000/alumno");
    this.setState({
      alumnos: response.data
    });
    console.log(this.state.alumnos);
  };

  getMateria = async () => {
    const response = await axios.get("http://localhost:4000/materia");
    this.setState({
      materias: response.data.data
    });
    console.log(this.state.materias);
  };

  onChange = e => {
    this.setState({
      Alumno_Materia: {
        ...this.state.Alumno_Materia,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <div className="form">
          <form action="" onSubmit={this.onSubmit}>
            
            <label htmlFor="">Alumno</label>
            <select
              name="fk_alumno"
              value={this.state.Alumno_Materia.fk_alumno}
              onChange={this.onChange}
            >
              {this.state.alumnos.map(alumno => (
                <option value={alumno.id_alumo} key={alumno.id_alumo}>
                  {alumno.nombres} {alumno.apellido_paterno} {alumno.apellido_materno}
                </option>
              ))}
            </select>

            <label htmlFor="">Asignatura</label>
            <select 
              name="fk_materia" 
              value={this.state.Alumno_Materia.fk_materia}
              onChange={this.onChange}
            >
              {
                this.state.materias.map( materia => (
                  <option value={materia.id_materia} key={materia.id_materia}>
                    {materia.nombre}
                  </option>
                ))
              }
            </select>
            
            <label htmlFor="">Grupo</label>
            <select 
              name="fk_grupo" 
              value={this.state.Alumno_Materia.fk_grupo}
              onChange={this.onChange}  
            >
              {
                this.state.grupos.map( (grupo) => (
                  <option value={grupo.id_grupo} key={grupo.id_grupo}>
                    {grupo.clave_grupo} {grupo.turno} 
                  </option>
                ))
              }
            </select>
            
            <label htmlFor="">Calificaciones</label>
            <select 
              name="fk_calificaciones" 
              value={this.state.Alumno_Materia.fk_calificion}
              onChange ={this.onChange}
            >
              {
                this.state.calificaciones.map( (calificacion) => 
                  <option value={calificacion.id_calificacion} key={calificacion.id_calificacion}>
                    {calificacion.bimestre_uno}
                  </option>
                )
              }
            </select>

            <input 
              value={this.state.Alumno_Materia.faltas_totales}
              type="number" 
              name="faltas_totales" 
              placeholder="Faltas Totales"
              onChange={this.onChange}
            />

            <button>Guardar</button>
          </form>
        </div>
      </div>
    );
  }
}
