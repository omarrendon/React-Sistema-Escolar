import React, { Component } from "react";
import axios from "axios";
import {Snackbar} from "./snackbar/Snackbar";

export default class AlumnoMateria extends Component {
  snackbarRef = React.createRef();

  state = {
    carreras: [],
    grupos: [],
    materias: [],
    alumnoGrupo: [],
    periodos: [],
    boletaData: {
      id_carrea: "",
      id_materia: "",
      id_grupo: "",
      fk_grupo: "",
      fk_materia: "",
      id_periodo: "",
    },
  };

  componentDidMount() {
    this.getCarrera();
    this.getGrupo();
    this.getMateria();
    this.getPeriodos();
  }

  getCarrera = async () => {
    const response = await axios.get("http://localhost:8080/carreras/listar");
    this.setState({
      carreras: response.data,
    });
    console.log("CARRERAS");
    console.log(this.state.carreras);
  };

  getGrupo = async () => {
    const response = await axios.get("http://localhost:8080/grupos/listar")
    this.setState({
      grupos : response.data
    });
    console.log("GRUPOS");
    console.log(this.state.grupos);
  };

  getMateria = async () => {
    const response = await axios.get("http://localhost:8080/materias/listar");
    this.setState({
      materias: response.data,
    });
    console.log("Materias");
    console.log(this.state.materias);
  };

  getPeriodos = async () => {
    const response = await axios.get("http://localhost:8080/periodos/listar");
    this.setState({
      periodos: response.data,
    });
    console.log("PERIODOS");
    console.log(this.state.periodos);
  };

  onChange = (event) => {
    this.setState({
        boletaData: {
          ...this.state.boletaData,
          [event.target.name]: event.target.value
        }
      });
  };

  onSubmit = async (event) => {
    event.preventDefault();
   
    const {
      id_carrera,
      id_materia,
      id_grupo,
      id_periodo,
    } = this.state.boletaData;

    let fk_grupo = id_grupo
    let fk_materia = id_materia
    console.log(
      "DATA---"+
      "ID_CARRERA"+id_carrera+""+
      "ID_MATERIA"+id_materia+""+
      "ID_GRUPO"+id_grupo+""+
      "FK_GRUPO"+fk_grupo+""+
      "FK_MATERIA"+fk_materia+""+
      "ID_PERIODO"+id_periodo
    );
    this.snackbarRef.current.openSnackBar('Boleta Generada..');
    
    // const data = new FormData(event.target);
    // data.set("id_carrea", data.get("id_carrea"));
    // data.set("id_materia", data.get("id_materia"));
    // data.set("id_grupo", data.get("id_grupo"));
    // data.set("id_periodo", data.get("id_periodo"));
    // data.set(fk_grupo, data.get(fk_grupo));
    // data.set(fk_materia, data.get(fk_materia));


    await axios.get(
      "http://localhost:8080/materias/boleta?id_carrera=" + id_carrera + "&id_materia=" + id_materia + "&id_grupo=" + id_grupo + "&fk_grupo=" + fk_grupo + "&fk_materia=" +fk_materia + "&id_periodo=" + id_periodo);
  };

  render() {
    const { carreras, grupos, materias, boletaData, periodos} = this.state;

    return (
      <div className="row">
        <div className="col-12 col-md-12 col-sm-12">
          <div className="card card-body">
            <div className="form-group">
            <div className="h3 text-center">Generar Boleta</div>
            <hr/>
            <Snackbar ref={this.snackbarRef}/>

              <form onSubmit={this.onSubmit}>
                <select
                  value={boletaData.id_carrera}
                  name="id_carrera"
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {carreras.map((lic) => (
                    <option value={lic.id_carrera} key={lic.id_carrera}>
                      {" "}
                      {lic.nombre}
                    </option>
                  ))}
                </select>
                <hr/>
                
                <select
                  value={boletaData.id_grupo}
                  name="id_grupo"
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {grupos.map((grupo) => (
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
                <hr/>

                <select
                  value={boletaData.id_materia}
                  name="id_materia"
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {materias.map((materia) => (
                   <option value={materia.id_materia} key={materia.id_materia}>
                   {" "}
                   {materia.nombre}
                 </option>
                  ))}
                </select>
                <hr/>

                <select
                  value={boletaData.id_periodo}
                  name="id_periodo"
                  onChange={this.onChange}
                  className="custom-select"
                >
                  {periodos.map((periodo) => (
                   <option value={periodo.id_periodo} key={periodo.id_periodo}>
                   {" "}
                   {periodo.anio}
                   {" "}
                    {periodo.periodo}
                 </option>
                  ))}
                </select>
                <hr/>
                <button type="submit" className="btn btn-success">Generar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      //   <>

      //       <div className="row ">
      //         {/* CARRERAS */}
      //         <div className="col-12 col-md-4 col-sm-12">
      //           <div className="card card-body">
      //             <div className="h3 text-center">Seleccionar Licenciatura</div>
      //             <ul className="list-group">
      //               {carreras.map((carrera) => (
      //                 <li
      //                   key={carrera.id_carrera}
      //                   className="list-group-item"
      //                   onClick={() => this.getGruposByCarrea(carrera.id_carrera)}
      //                 >
      //                   {carrera.nombre}
      //                 </li>
      //               ))}
      //             </ul>
      //           </div>
      //         </div>

      //         {/* GRUPOS */}
      //         <div className="col-12 col-md-4 col-sm-12">
      //           <div className="card card-body">
      //             <div className="h3 text-center">Seleccionar Grupo</div>
      //             <ul className="list-group">
      //               {gruposCrarrea.map((grupo) => (
      //                 <li
      //                   className="list-group-item"
      //                   key={grupo.id_grupo}
      //                   onClick={() => this.getMateriasByGruop(grupo.id_grupo)}
      //                 >
      //                   <span>GRUPO : {grupo.clave_grupo}</span>
      //                   <div className="dropdown-divider"></div>
      //                   <span>
      //                     CLAVE LICENCIATURA : {grupo.clave_cuatrimestre}
      //                   </span>
      //                   <div className="dropdown-divider"></div>
      //                   <span>AULA : {grupo.aula}</span>
      //                 </li>
      //               ))}
      //             </ul>
      //           </div>
      //         </div>

      //         <div className="dropdown-divider"></div>

      //         {/* MATERIAS */}
      //         <div className="col-12 col-md-4 col-sm-12">
      //           <div className="card card-body">
      //             <div className="h3 text-center">Calificar Materia</div>
      //             <ul className="list-group">
      //               {materiasGrupo.map((materia) => (
      //                 <div className="card card-body" key={materia.nombre}>
      //                   <p>{materia.nombre}</p>

      //                   <button
      //                     // onClick={() => this.calificarBoleta(materia.id_materia)}
      //                     className="btn btn-success"
      //                   >
      //                     Calificar
      //                   </button>
      //                 </div>
      //               ))}
      //             </ul>
      //           </div>
      //         </div>
      //       </div>
      //   </>
    );
  }
}
