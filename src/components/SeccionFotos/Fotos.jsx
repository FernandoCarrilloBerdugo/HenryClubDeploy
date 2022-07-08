import React from 'react';
import NavBar from '../../navbar/navbar';
import { Link } from 'react-router-dom';
import S from '../SeccionFotos/Fotos.module.css';

export default function Fotos() {
  return (
    <div>
      <NavBar />

      <div className={S.contenedor}>
        <h1>Galeria de imagenes</h1>
      </div>
    </div>
  );
}
