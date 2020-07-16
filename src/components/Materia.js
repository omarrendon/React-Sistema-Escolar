import React, { Component } from "react";
import axios from "axios";
import { Snackbar } from "./snackbar/Snackbar";
import MateriasMap from "./MateriasMap";
import PaginacionAlumno from "./PaginacionAlumno";

export default class Materia extends Component {
  snackbarRef = React.createRef();

  state = {
    materias: [],
    materia: {
      nombre: "",
      horas: "",
      faltas_permitidas: "",
      fk_maestro: "",
      fk_carrera: "",
      fk_grupo: "",
    },
    carreras: [],
    maestros: [],
    grupos: [],
    // paginacion
    loading: false,
    paginaActual: 1,
    materiaPorPagina: 5,
  };

  componentDidMount() {
    this.getCarrera();
    this.getMaestro();
    this.getMateria();
    this.getGrupo();
  }

  getGrupo = async () => {
    const grupo = await axios.get("http://localhost:8080/grupos/listar");
    this.setState({
      grupos: grupo.data,
    });
    console.log("GRUPOS");
    console.log(this.state.grupos);
  };

  getCarrera = async () => {
    const carrera = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: carrera.data,
    });
    console.log("Carreras");
    console.log(this.state.carreras);
  };

  getMaestro = async () => {
    const response = await axios.get("http://localhost:8080/maestros/listar");
    this.setState({
      maestros: response.data,
    });
    console.log("Maestro");

    console.log(this.state.maestros);
  };

  getMateria = async () => {
    this.setState({ loading: true });
    const response = await axios.get("http://localhost:8080/materias/listar");
    this.setState({
      materias: response.data,
    });
    this.setState({ loading: false });
    console.log("Materias");
    console.log(this.state.materias);
  };

  onChange = (e) => {
    this.setState({
      materia: {
        ...this.state.materia,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = async (e) => {
    const { nombre, horas, faltas_permitidas } = this.state.materia;
    e.preventDefault();

    const data = new FormData(e.target);
    data.set("nombre", data.get("nombre"));
    data.set("horas", data.get("horas"));
    data.set("faltas_permitidas", data.get("faltas_permitidas"));
    data.set("fk_maestro", data.get("fk_maestro"));
    data.set("fk_carrera", data.get("fk_carrera"));
    data.set("fk_grupo", data.get("fk_grupo"));

    if (nombre === "" || horas === "" || faltas_permitidas === "") {
      alert("RELLENAR TODOS LOS CAPOS FALTANTES");
    } else {
      await axios.post("http://localhost:8080/materias/crear", data);
      this.snackbarRef.current.openSnackBar("Materia Agregada Exitosamente...");
      this.getCarrera();
      this.getMaestro();
      this.getMateria();
      this.setState({
        materia: {
          nombre: "",
          horas: "",
          faltas_permitidas: "",
          fk_maestro: "",
          fk_carrera: "",
          fk_grupo: "",
        },
      });
    }
  };

  deleteUser = async (id_materia) => {
    await axios.get(`http://localhost:8080/materias/borrar/${id_materia}`);
    this.snackbarRef.current.openSnackBar("Materia Eliminada...");
    this.getMateria();
    console.log("MATERIA ELIMINADA :" + id_materia);
  };

  render() {
    const {
      nombre,
      horas,
      faltas_permitidas,
      fk_maestro,
      fk_carrera,
      fk_grupo,
    } = this.state.materia;

    const { paginaActual, materiaPorPagina, loading } = this.state;
    const indexUltimaPagina = paginaActual * materiaPorPagina;
    const indexPaginaActual = indexUltimaPagina - materiaPorPagina;
    const materiaActual = this.state.materias.slice(
      indexPaginaActual,
      indexUltimaPagina
    );

    const paginate = (pageNum) => this.setState({ paginaActual: pageNum });
    const nextPage = () => this.setState({ paginaActual: paginaActual + 1 });
    const prevPage = () => this.setState({ paginaActual: paginaActual - 1 });
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card card-body">
            <h3>Registro de Asignaturas</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <br />
                <input
                  value={nombre}
                  type="text"
                  placeholder="Nombre Asignatura"
                  name="nombre"
                  onChange={this.onChange}
                  className="form-control"
                />
                <br />

                <input
                  value={horas}
                  type="number"
                  placeholder=" Horas totales de la Asignatura"
                  name="horas"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />

                <input
                  value={faltas_permitidas}
                  type="number"
                  placeholder="Número de faltas permitidas"
                  name="faltas_permitidas"
                  className="form-control"
                  onChange={this.onChange}
                />
                <br />

                <label htmlFor="">Licenciatura</label>
                <select
                  value={fk_carrera}
                  name="fk_carrera"
                  className="custom-select"
                  onChange={this.onChange}
                >
                  {this.state.carreras.map((lic) => (
                    <option value={lic.id_carrera} key={lic.id_carrera}>
                      {" "}
                      {lic.nombre}
                    </option>
                  ))}
                </select>

                <br />

                <label htmlFor="">Grupo</label>
                <select
                  value={fk_grupo}
                  name="fk_grupo"
                  className="custom-select"
                  onChange={this.onChange}
                >
                  {this.state.grupos.map((grupo) => (
                    <option value={grupo.id_grupo} key={grupo.id_grupo}>
                      {" "}
                      {grupo.clave_grupo} {grupo.clave_cuatrimestre}{" "}
                      {grupo.turno}
                    </option>
                  ))}
                </select>

                <br />
                <br />

                <label htmlFor="">Docente a impartir la materia</label>
                <select
                  name="fk_maestro"
                  value={fk_maestro}
                  className="custom-select"
                  onChange={this.onChange}
                >
                  {this.state.maestros.map((maestro) => (
                    <option value={maestro.id_maestro} key={maestro.id_maestro}>
                      {" "}
                      {maestro.nombres} {maestro.apellido_paterno}{" "}
                      {maestro.apellido_materno}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
                <Snackbar ref={this.snackbarRef} />
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <MateriasMap
            posts={materiaActual}
            loading={loading}
            deleteMateria={this.deleteUser}
          />
          <PaginacionAlumno
            postPerPage={materiaPorPagina}
            totalPost={this.state.materias.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
    );
  }
}
