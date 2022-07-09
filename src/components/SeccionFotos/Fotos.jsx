import React from 'react';
import NavBar from '../../navbar/navbar';
import { Link } from 'react-router-dom';
import S from '../SeccionFotos/Fotos.module.css';
import Footer from '../footer/footer.jsx';

export default function Fotos() {
  return (
    <div className={S.contenedorGeneral}>
      <NavBar />

      <h1 className={S.tituloGaleria}>Galeria de imagenes</h1>
      <div className={S.contenedor}></div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
