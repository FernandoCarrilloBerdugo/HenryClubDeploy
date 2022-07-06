import React, { useEffect } from 'react';
import { getNews } from '../../redux/Actions/Action';
import { useDispatch, useSelector } from 'react-redux';
import S from './Home.module.css';
import Footer from '../footer/footer.jsx';
import NavBar from '../../navbar/navbar';
import Barra from '../../Barra/Barra';
import GaleriaImg from '../Galeria de imagenes/GaleriaImg';
import News from '../News/News';

export default function Home() {
  const news = useSelector(state => state.news);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className={S.contenedorGeneral}>
      <NavBar /> {/* ACA VA LA NAVBAR */}
      <div className={S.carouselImg}>
        <GaleriaImg />
      </div>
      {/* <Barra /> */}
      <div className={S.contenido}>
        <h1 className={S.titleNews}>Últimas del club</h1>
        <div className={S.contenidoCentral}>
          {news?.slice(0, 4).map(e => {
            return (
              <News
                key={e.id}
                id={e.id}
                image={e.image}
                title={e.title}
                subtitle={e.subtitle}
              />
            );
          })}

          {/* ACA VA EL CONTENIDO GENERAL DE LA PAGINA */}
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
