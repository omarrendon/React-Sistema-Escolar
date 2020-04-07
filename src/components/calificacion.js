import React, { Component } from "react";
import axios from "axios";

export default class calificacion extends Component {
  state = {
    materias: [],
    parciales : {
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
  }

  getMateria = async () => {
    const response = await axios.get("http://localhost:4000/materia");
    this.setState({
      materias: response.data.data
    });
    console.log("MATERIAS");
    console.log(this.state.materias);
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
      parciales : {
        bimestre_uno: "",
      bimestre_dos: "",
      ordinario: "",
      promedio_bimestral: "",
      promedio_final: "",
      extraordinario: "",
      titulo: "",
      insuficiencia: ""
      }
    })
    console.log("CALIFICADO")
  }

  render() {
    return (
      <div className="container">
        <div className="titulo">Calificar materia</div>
        <label htmlFor="">Asignatura</label>
        <select
          name="fk_materia"
        >
          {this.state.materias.map(materia => (
            <option value={materia.id_materia} key={materia.id_materia}>
              {materia.nombre}
            </option>
          ))}
        </select>
        <div className="materiaCalifica">
          <h3>Calificar Materia</h3>
          <form action="" onSubmit={this.calificar}>
            <label htmlFor="">Primer Bimestre</label>
            <input
              value={this.state.parciales.bimestre_uno}
              type="number"
              name="bimestre_uno"
              onChange={this.onChange}
            />

            <label htmlFor="">Segundo Bimestre</label>
            <input
              value={this.state.parciales.bimestre_dos}
              type="number"
              name="bimestre_dos"
              onChange={this.onChange}
            />

            <label htmlFor="">Ordinario</label>
            <input
              value={this.state.parciales.ordinario}
              type="number"
              name="ordinario"
              onChange={this.onChange}
            />

            <label htmlFor="">Promedio Bimestral</label>
            <input
              value={this.state.parciales.promedio_bimestral}
              type="number"
              name="promedio_bimestral"
              onChange={this.onChange}
            />

            <label htmlFor="">Promedio Final</label>
            <input
              value={this.state.parciales.promedio_final}
              type="number"
              name="promedio_final"
              placeholder-="Promedio Final"
              onChange={this.onChange}
            />

            <label htmlFor="">Extraordinario</label>
            <input
              value={this.state.parciales.extraordinario}
              type="number"
              name="extraordinario"
              onChange={this.onChange}
            />

            <label htmlFor="">Título</label>
            <input
              value={this.state.parciales.titulo}
              type="number"
              name="titulo"
              onChange={this.onChange}
            />

            <label htmlFor="">Insuficiencia</label>
            <input
              value={this.state.parciales.insuficiencia}
              type="number"
              name="insuficiencia"
              onChange={this.onChange}
            />
            <button type="submit">Aceptar</button>
          </form>
        </div>
      </div>
    );
  }
}
