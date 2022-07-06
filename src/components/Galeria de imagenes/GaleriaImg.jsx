import React from 'react';
import S from './GaleriaImg.module.css';
import futbol from '../../utils/fotos/futbol.jpg';
import tenis from '../../utils/fotos/tenis.jpg';
import basket from '../../utils/fotos/basket.jpg';

export default function GaleriaImg() {
  return (
    <div className={S.ContenedorGeneral}>
      <div className={S.galeria}>
        <ul>
          <li>
            <img src={futbol} alt="foto1" />
          </li>
          <li>
            <img src={tenis} alt="foto2" />
          </li>
          <li>
            <img src={basket} alt="foto3" />
          </li>
        </ul>
      </div>
    </div>
  );
}
