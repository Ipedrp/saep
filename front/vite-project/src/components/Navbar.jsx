import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Título na esquerda */}
        <span className="navbar-text me-auto">
          Gerenciamento de Tarefas
        </span>
        {/* Menu da direita */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/">
              <p className="nav-link" href="#cadastro-usuario">Cadastro de Usuário</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/task">
              <p className="nav-link" href="#cadastro-usuario">Cadastro de Tarefa</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gerenciamento">
              <p className="nav-link" href="#cadastro-usuario">Gerenciar Tarefa</p>
            </Link>

          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
