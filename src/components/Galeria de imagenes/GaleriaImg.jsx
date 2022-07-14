import React from 'react';
import S from './GaleriaImg.module.css';
import futbol from '../../utils/fotos/futbolInfantil.jpg';
import hockey from '../../utils/fotos/hockeyGaleria.jpg';
import natacion from '../../utils/fotos/natacionGaleria.jpg';

export default function GaleriaImg() {
  return (
    <div className={S.ContenedorGeneral}>
      <div className={S.galeria}>
        <ul>
          <li>
            <img src={futbol} alt="foto1" />
          </li>
          <li>
            <img src={hockey} alt="foto2" />
          </li>
          <li>
            <img src={natacion} alt="foto3" />
          </li>
        </ul>
      </div>
    </div>
  );
}
