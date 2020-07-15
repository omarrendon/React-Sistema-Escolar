import React, { component, Component } from "react";

export class AlumnosMap extends Component {
  render() {
    const { posts, loading, deleteUser } = this.props;

    if (loading) {
      return <h2>Cargando...</h2>;
    }
    return (
      <>
        {posts.map((post) => (
          <tr key={post.id_alumno}>
            <td>{post.nombre}</td>
            <td>{post.apellido_pat}</td>
            <td>{post.apellido_mat}</td>
            <td>{post.nombre_carrera}</td>
            <td>{post.matricula}</td>
            <td>{post.clave_grupo}</td>
            <td>
              <button
                onClick={() => deleteUser(post.id_alumno)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }
}
export default AlumnosMap;
