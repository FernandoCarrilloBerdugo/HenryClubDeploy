import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNews } from '../../redux/Actions/Action';
import './News.css';

export default function Noticias({ title, subtitle, image, id }) {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const noticia = useSelector(state => state.news);



  return (
    <div className="news" key={title}>
      <img
        src={
          image
            ? image
            : 'https://pbs.twimg.com/profile_images/631795502665756672/fZ5AQUNF_400x400.jpg'
        }
        alt="img not found"
        className="imgNews"
      />
      <h2 className="titleNewss">{title.slice(0, 60) + '...'}</h2>
      <h3 className="subtitleNews">
        {subtitle.split(' ').slice(0, 19).join(' ') + ' ...'}
      </h3>
      <Link to={`/news/${id}`}>
        <button>
          <span>Leer Más...</span>
        </button>
      </Link>
    </div>
  );
}
