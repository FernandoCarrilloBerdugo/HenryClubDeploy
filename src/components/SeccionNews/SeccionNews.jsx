import React, { useEffect } from 'react';
import News from '../News/News';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../redux/Actions/Action';
import S from '../SeccionNews/SeccionNews.module.css';
import NavBar from '../../navbar/navbar';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';

export default function SeccionNews() {
  const news = useSelector(state => state.news);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <div className={S.contenidoCentral}>
      <div>
        <NavBar />
      </div>

      <SearchBar />
      <div className={S.galeria}>
        {news.map(e => {
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
      </div>
      {/* ACA VA EL CONTENIDO GENERAL DE LA PAGINA */}
    </div>
  );
}
