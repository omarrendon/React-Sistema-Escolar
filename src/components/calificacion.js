import React, { Component } from "react";
import axios from "axios";

export default class calificacion extends Component {
  state = {
    materias: [],
    calificaciones: [],
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
    const response = await axios.get("http://localhost:8080/materias/listar");
    this.setState({
      materias: response.data
    });
    console.log("MATERIAS");
    console.log(this.state.materias);
  };

  getCalificaciones = async () => {
    const response = await axios.get("http://localhost:8080/calificacion/listar");
    this.setState({
      calificaciones: response.data
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
    const {
      bimestre_uno,
      bimestre_dos,
      ordinario,
      promedio_bimestral,
      promedio_final
    } = this.state.parciales;
   
    e.preventDefault();
    
    const data = new FormData(e.target);
    data.set('bimestre_uno' , data.get('bimestre_uno'));
    data.set('bimestre_dos' , data.get('bimestre_dos'));
    data.set('ordinario' , data.get('ordinario'));
    data.set('promedio_bimestral' , data.get('promedio_bimestral'));
    data.set('promedio_final' , data.get('promedio_final'));
    data.set('extraordinario' , data.get('extraordinario'));
    data.set('titulo' , data.get('titulo'));
    data.set('insuficiencia' , data.get('insuficiencia'));
    
    if (
      bimestre_uno === "" ||
      bimestre_dos === "" ||
      ordinario === "" ||
      promedio_bimestral === "" ||
      promedio_final === "" 
      //||
      // extraordinario === "" ||
      // titulo === ""
    ) {
      alert("RELLENAR TODOS LOS CAMPOS FALTANTES");
    } else {
      await axios.post("http://localhost:8080/calificacion/crear", data);
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
      this.getCalificaciones();
    }
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
                  <th scope="col"> Editar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.calificaciones.map(calificacion => (
                  <tr key={calificacion.id_calificacion}>
                    <th>{calificacion.bimestre_uno}</th>
                    <th>{calificacion.bimestre_dos}</th>
                    <th>{calificacion.ordinario}</th>
                    <th>{calificacion.promedio_bimestral}</th>
                    <th>{calificacion.promedio_final}</th>
                    <th>{calificacion.extraordinario}</th>
                    <th>{calificacion.titulo}</th>
                    <th>{calificacion.insuficiencia}</th>
                    <th> <button className="btn btn-success"> Editar</button></th>
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
