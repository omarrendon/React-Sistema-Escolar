import React, { Component } from "react";
import axios from "axios";

export default class calificacion extends Component {
  state = {
    materias: [],
    calificaciones : [],
    parciales: {
      bimestre_uno: "",
      bimestre_dos: "",
      ordinario: "",
      promedio_bimestral: "",
      promedio_final: "",
      extraordinario: "",
      titulo: "",
      insuficiencia: ""
    }
  };

  componentDidMount() {
    this.getMateria();
    this.getCalificaciones();
  }

  getMateria = async () => {
    const response = await axios.get("http://localhost:4000/materia");
    this.setState({
      materias: response.data.data
    });
    console.log("MATERIAS");
    console.log(this.state.materias);
  };

  getCalificaciones = async () => {
    const response = await axios.get("http://localhost:4000/calificacion");
    this.setState({
      calificaciones : response.data.data
    });
    console.log("calificaciones");
    console.log(this.state.calificaciones);
  };

  onChange = e => {
    this.setState({
      parciales: {
        ...this.state.parciales,
        [e.target.name]: e.target.value
      }
    });
  };

  calificar = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/calificacion", {
      bimestre_uno: this.state.parciales.bimestre_uno,
      bimestre_dos: this.state.parciales.bimestre_dos,
      ordinario: this.state.parciales.ordinario,
      promedio_bimestral: this.state.parciales.promedio_bimestral,
      promedio_final: this.state.parciales.promedio_final,
      extraordinario: this.state.parciales.ordinario,
      titulo: this.state.parciales.titulo,
      insuficiencia: this.state.parciales.insuficiencia
    });
    this.setState({
      parciales: {
        bimestre_uno: "",
        bimestre_dos: "",
        ordinario: "",
        promedio_bimestral: "",
        promedio_final: "",
        extraordinario: "",
        titulo: "",
        insuficiencia: ""
      }
    });
    console.log("CALIFICADO");
    this.getCalificaciones()
  };

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="select">
              <h3>Seleccionar Asignatura</h3>
              <select
                name="fk_materia"
                className="custom-select custom-select-lg mb-3"
              >
                {this.state.materias.map(materia => (
                  <option value={materia.id_materia} key={materia.id_materia}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-divider"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card card-body">
              <form onSubmit={this.calificar}>
                <div className="form-group">
                  <h3>Calificar Asignatura</h3>
                  <input
                    value={this.state.parciales.bimestre_uno}
                    type="number"
                    name="bimestre_uno"
                    className="form-control"
                    placeholder="Primer Bimestre"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.bimestre_dos}
                    placeholder="Segundo Bimestre"
                    type="number"
                    name="bimestre_dos"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.ordinario}
                    placeholder="Ordinario"
                    type="number"
                    name="ordinario"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.promedio_bimestral}
                    placeholder="Promedio Bimestral"
                    type="number"
                    className="form-control"
                    name="promedio_bimestral"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.promedio_final}
                    placeholder="Promedio Final"
                    type="number"
                    name="promedio_final"
                    placeholder-="Promedio Final"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.extraordinario}
                    placeholder="Extraordinario"
                    type="number"
                    name="extraordinario"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.titulo}
                    placeholder="Título"
                    type="number"
                    name="titulo"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>

                  <input
                    value={this.state.parciales.insuficiencia}
                    placeholder="Insuficiencia"
                    type="number"
                    name="insuficiencia"
                    className="form-control"
                    onChange={this.onChange}
                  />
                  <div className="dropdown-divider"></div>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-9">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"> Primer Bimestre</th>
                  <th scope="col"> Segundo Bimestre</th>
                  <th scope="col"> Ordinario</th>
                  <th scope="col"> Promedio Bimestral</th>
                  <th scope="col"> Promedio Final</th>
                  <th scope="col"> Extraordinario</th>
                  <th scope="col"> Título</th>
                  <th scope="col"> Insuficiencia</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.calificaciones.map( (calificacion) => (
                    <tr key={calificacion.id_calificacion}>
                      <th>{calificacion.bimestre_uno}</th>
                      <th>{calificacion.bimestre_dos}</th>
                      <th>{calificacion.ordinario}</th>
                      <th>{calificacion.promedio_bimestral}</th>
                      <th>{calificacion.promedio_final}</th>
                      <th>{calificacion.extraordinario}</th>
                      <th>{calificacion.titulo}</th>
                      <th>{calificacion.insuficiencia}</th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
// <div className="container">
//   <div className="titulo">Calificar materia</div>
//   <label htmlFor="">Asignatura</label>
//   <select
//     name="fk_materia"
//   >
//     {this.state.materias.map(materia => (
//       <option value={materia.id_materia} key={materia.id_materia}>
//         {materia.nombre}
//       </option>
//     ))}
//   </select>
//   <div className="materiaCalifica">
//     <h3>Calificar Materia</h3>
//     <form action="" onSubmit={this.calificar}>
//       <label htmlFor="">Primer Bimestre</label>
//       <input
//         value={this.state.parciales.bimestre_uno}
//         type="number"
//         name="bimestre_uno"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Segundo Bimestre</label>
//       <input
//         value={this.state.parciales.bimestre_dos}
//         type="number"
//         name="bimestre_dos"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Ordinario</label>
//       <input
//         value={this.state.parciales.ordinario}
//         type="number"
//         name="ordinario"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Promedio Bimestral</label>
//       <input
//         value={this.state.parciales.promedio_bimestral}
//         type="number"
//         name="promedio_bimestral"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Promedio Final</label>
//       <input
//         value={this.state.parciales.promedio_final}
//         type="number"
//         name="promedio_final"
//         placeholder-="Promedio Final"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Extraordinario</label>
//       <input
//         value={this.state.parciales.extraordinario}
//         type="number"
//         name="extraordinario"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Título</label>
//       <input
//         value={this.state.parciales.titulo}
//         type="number"
//         name="titulo"
//         onChange={this.onChange}
//       />

//       <label htmlFor="">Insuficiencia</label>
//       <input
//         value={this.state.parciales.insuficiencia}
//         type="number"
//         name="insuficiencia"
//         onChange={this.onChange}
//       />
//       <button type="submit">Aceptar</button>
//     </form>
//   </div>
// </div>
