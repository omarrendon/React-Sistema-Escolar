import React, { component, Component } from "react";

export class MaestrosMap extends Component {
  render() {
    const { posts, loading, deleteUser } = this.props;

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    return (
        <>
            {posts.map( (post) => (
                <tr key={post.id_maestro}>
                <td>{post.nombres}</td>
                <td>{post.apellido_paterno}</td>
                <td>{post.apellido_materno}</td>
                <td>{post.matricula}</td>
                <td>
                  <button
                    onClick={() => deleteUser(post.id_maestro)}
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

export default MaestrosMap;
