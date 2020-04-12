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
      fk_calificacion: "",
      faltas_totales: ""
    },
    content: []
  };

  componentDidMount() {
    this.getAlumnos();
    this.getMateria();
    this.getGrupos();
    this.getCalificaciones();
    this.getAlumnoMateria();
  }

  getCalificaciones = async () => {
    const response = await axios.get("http://localhost:4000/calificacion");
    this.setState({
      calificaciones: response.data.data
    });
    // console.log("CALIFICACIONES");
    // console.log(this.state.calificaciones);
  };

  getGrupos = async () => {
    const response = await axios.get("http://localhost:4000/grupo");
    this.setState({
      grupos: response.data.data
    });
    // console.log("GRUPOS");
    // console.log(this.state.grupos);
  };

  getAlumnos = async () => {
    const response = await axios.get("http://localhost:4000/alumno");
    this.setState({
      alumnos: response.data
    });
    // console.log("ALUMNOS");
    // console.log(this.state.alumnos);
  };

  getMateria = async () => {
    const response = await axios.get("http://localhost:4000/materia");
    this.setState({
      materias: response.data.data
    });
    // console.log("MATERIAS");
    // console.log(this.state.materias);
  };

  getAlumnoMateria = async () => {
    const response = await axios.get("http://localhost:4000/AlumnoMateria");
    this.setState({
      content: response.data.data
    });
    console.log("CONTENIDO BOLETA");
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
    await axios.post("http://localhost:4000/AlumnoMateria", {
      faltas_totales: this.state.Alumno_Materia.faltas_totales,
      fk_alumno: this.state.Alumno_Materia.fk_alumno,
      fk_materia: this.state.Alumno_Materia.fk_materia,
      fk_grupo: this.state.Alumno_Materia.fk_grupo,
      fk_calificacion: this.state.Alumno_Materia.fk_calificacion
    });
    console.log("Creado");
    this.getAlumnoMateria();
  };

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <h2>Generar Boleta</h2>
            <div class="dropdown-divider"></div>
            <div className="card card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <span>
                    <strong>Alumno</strong>
                  </span>
                  <select
                    name="fk_alumno"
                    value={this.state.Alumno_Materia.fk_alumno}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.alumnos.map(alumno => (
                      <option value={alumno.id_alumo} key={alumno.id_alumo}>
                        {alumno.nombres} {alumno.apellido_paterno}{" "}
                        {alumno.apellido_materno}
                      </option>
                    ))}
                  </select>
                  <span>
                    <strong>Asignatura</strong>
                  </span>
                  <select
                    name="fk_materia"
                    value={this.state.Alumno_Materia.fk_materia}
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
                    <strong>Grupo</strong>
                  </span>
                  <select
                    name="fk_grupo"
                    value={this.state.Alumno_Materia.fk_grupo}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.grupos.map(grupo => (
                      <option value={grupo.id_grupo} key={grupo.id_grupo}>
                        {grupo.clave_grupo} - {grupo.turno}
                      </option>
                    ))}
                  </select>
                  <span>
                    <strong>Calificaciones</strong>
                  </span>
                  <select
                    name="fk_calificacion"
                    value={this.state.Alumno_Materia.fk_calificacion}
                    className="custom-select"
                    onChange={this.onChange}
                  >
                    {this.state.calificaciones.map(calificacion => (
                      <option
                        value={calificacion.id_calificacion}
                        key={calificacion.id_calificacion}
                      >
                        - Primer Bimestre : {calificacion.bimestre_uno}- Segundo
                        Bimestre : {calificacion.bimestre_dos}- Ordinario :{" "}
                        {calificacion.ordinario}- Promedio Bimestral :{" "}
                        {calificacion.promedio_bimestral}- Promedio Final :{" "}
                        {calificacion.promedio_final}- Extraordinario :{" "}
                        {calificacion.extraordinario}- Título :{" "}
                        {calificacion.titulo}- Insuficiencia :{" "}
                        {calificacion.insuficiencia}
                      </option>
                    ))}
                  </select>
                  <span>
                    <strong>Faltas Totales</strong>
                  </span>
                  <input
                    value={this.state.Alumno_Materia.faltas_totales}
                    type="number"
                    name="faltas_totales"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div class="dropdown-divider"></div>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
            <div class="dropdown-divider"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Imprimir Boleta</h2>
            <div class="dropdown-divider"></div>

            <div className="row row-cols-1 row-cols-md-3">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//   <div className="list">
//     <ul>
//       {this.state.content.map(boleta => (
//         <div key={boleta.id_alumno_materia}>
//           <li>
//             <span>
//               {" "}
//               <strong>Alumno : </strong> {boleta.aluAlumno.nombres}{" "}
//               {boleta.aluAlumno.apellido_paterno}{" "}
//               {boleta.aluAlumno.apellido_materno}
//             </span>
//             <br />

//             <span>
//               <strong>Asignaruta : </strong> {boleta.aluMateria.nombre}
//             </span>
//             <br />

//             <span>
//               {" "}
//               <strong>Horas Totales : </strong> {boleta.aluMateria.horas}
//             </span>
//             <br />

//             <span>
//               {" "}
//               <strong>Faltas Permitidas : </strong>{" "}
//               {boleta.aluMateria.faltas_permitidas}
//             </span>
//             <br />

//             <span>
//               {" "}
//               <strong>Faltas Totales : </strong>{" "}
//               {boleta.faltas_permitidas}
//             </span>
//             <br />

//             <span>
//               {" "}
//               <strong>Grupo : </strong>
//               {boleta.aluGrupo.clave_grupo} - {boleta.aluGrupo.turno}
//             </span>
//             <br />
//             <span>
//               {" "}
//               <strong>Calificaciones : </strong>
//               <br />
//               <span>- Primer Bimestre </span>
//               {boleta.aluCalificaciones.bimestre_uno}
//               <br />
//               <span>- Segundo Bimestre </span>
//               {boleta.aluCalificaciones.bimestre_dos}
//               <br />
//               <span>- Ordinario </span>
//               {boleta.aluCalificaciones.ordinario}
//               <br />
//               <span>- Promedio Bimestral </span>
//               {boleta.aluCalificaciones.promedio_bimestral}
//               <br />
//               <span>- Promedio Final </span>
//               {boleta.aluCalificaciones.promedio_final}
//               <br />
//               <span>- Extraordinario </span>
//               {boleta.aluCalificaciones.extraordinario}
//               <br />
//               <span>- Título </span>
//               {boleta.aluCalificaciones.titulo}
//               <br />
//               <span>- Insuficiencia </span>
//               {boleta.aluCalificaciones.insuficiencia}
//               <br />
//             </span>
//               <button>Imprimir</button>
//           </li>
//           <br />
//         </div>
//       ))}
//     </ul>
//   </div>

// </div></div>
