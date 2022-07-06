import React from 'react';
import S from './Landing.module.css';
import logoHenry from '../../utils/fotos/LOGODIA.png';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className={S.contenedorGeneral}>
      <div className={S.titulo}>
        <h1>Henry Club</h1>
      </div>
      <div className={S.logo}>{/* aca va el logo */}</div>

      <div className={S.botones}>
        <div className={S.btnIngresar}>
          <Link to={'/home'}>
            <button>Ingresar</button>
          </Link>
        </div>

        {localStorage.getItem('data') ? null : (
          <div className={S.btnRegistro}>
            <Link to={'/register'}>
              <button>
                <span>Registrate</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
