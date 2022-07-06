import React from 'react';
import S from './Home2.module.css';
import Footer from '../../components/footer/footer';
import Barra from '../../Barra/Barra';
import GaleriaImg from '../../components/Galeria de imagenes/GaleriaImg';
import News from '../News2/News2';

export default function Home() {
  return (
    <div className={S.contenedorGeneral}>
      <Barra/>
      <div className={S.contenido}>
        <div className={S.contenidoCentral}>
          <News /> {/* ACA VA EL CONTENIDO GENERAL DE LA PAGINA */}
        </div>

        <div className={S.carouselImg}>
          <GaleriaImg />
        </div>

        <div className={S.iconoWsp}>{/* ACA VA EL ICONO DE WSP */}</div>
      </div>
      <div className={S.footer}>
        <Footer />
        {/* ACA VA EL FOOTER */}
      </div>
    </div>
  );
}
