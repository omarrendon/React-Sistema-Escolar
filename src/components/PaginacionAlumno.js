import React, { Component } from "react";

export class PaginacionAlumno extends Component {
  render() {
    const { postPerPage, totalPost, paginate, nextPage, prevPage} = this.props;
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalPost / postPerPage); index++) {
      pageNumbers.push(index);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={ ()=> prevPage()}>Anterior</a>  
          </li>
          {pageNumbers.map( (page) => (
              <li className="page-itme" key={page}>
                  <a onClick={ () => paginate(page)} className="page-link" href="#">{page}</a> 
              </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={ ()=> nextPage()}>Siguiente</a>  
          </li>
        </ul>
      </nav>
    );
  }
}
export default PaginacionAlumno;