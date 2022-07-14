import React from 'react';
import { Link } from 'react-router-dom';
import logoHenry from '../../utils/fotos/LOGONARANJA.png';
import { FaArrowCircleRight } from 'react-icons/fa';
import './headerAdmin.css';

export default function navbar() {
  const logOut = e => {
    // e.preventDefault();
    window.localStorage.removeItem('data');
    window.localStorage.removeItem('token');
    alert('Adios!');
  };
  return (
    <div>
      <div className="header">
        <Link to="/home">
          <img className="logo" src={logoHenry} alt="logo" />
        </Link>
        <h1 className="titulo">Club Henry</h1> <br /> {/* titulo */}
        <div>
          {localStorage.getItem('token') ? (
            <div>
              <p className="botonDeslizableNav">
                {localStorage.getItem('data') ? (
                  <div className="nombredeUsuario">
                    {JSON.parse(localStorage.getItem('data')).name}
                  </div>
                ) : (
                  'No hay usuario logueado'
                )}
              </p>

              {/* <div className="dropdown-content">
                <ul>
                  <li>
                    <Link>
                      <p>Perfil</p>
                    </Link>
                  </li>

                  <li>
                    <Link to="/login">
                      <p onClick={logOut}>Cerrar Sesión</p>
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          ) : (
            <div>
              <Link to="/login">
                <p className="botonDeslizable">
                  <FaArrowCircleRight className="flechita" />
                </p>
              </Link>

              <div className="dropdown-content">
                <ul>
                  <li>
                    <Link to="/login">
                      <span>Iniciar Sesión</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/registrate">
                      <span>Registrate</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
