import React, { component, Component } from "react";

export class MateriasMap extends Component {
  render() {
    const { posts, loading, deleteMateria } = this.props;

    if (loading) {
      return <h2>Cargando...</h2>;
    }
    return (
      <>
        {posts.map((materia) => (
          <div className="card bg-light mb-3" key={materia.id_materia}>
            <div className="card-header">{materia.nombre_carrera}</div>
            <div className="card-body">
              <h5 className="card-title">{materia.nombre}</h5>
              <p className="card-text">
                <span>
                  {" "}
                  <strong>Docente :</strong>
                  {materia.nombres} {materia.apellido_paterno}{" "}
                  {materia.apellido_materno}
                </span>
                <br />
                <span>
                  {" "}
                  <strong>Total de Horas : </strong>
                  {materia.horas}
                  {" Horas "}
                </span>
                <br />
                <span>
                  <strong>Faltas Permitidas : </strong>{" "}
                  {materia.faltas_permitidas}
                </span>
              </p>
              <button
                className="btn btn-danger"
                onClick={() => deleteMateria(materia.id_materia)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default MateriasMap;
