import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaCopyright,
  FaLinkedin,
} from 'react-icons/fa';
import S from '../footer/footer.module.css';
import { Link } from 'react-router-dom';
export default function footer() {
  return (
    <div>
      <div className={S.contenedorGeneral}>
        <div className={S.redes}>
          <h3>Redes Sociales</h3>
          <ul>
            <li className={S.fb}>
              <a href="https://www.facebook.com/soyhenryok/" target="_blank">
                <FaFacebook />
              </a>
            </li>
            <li className={S.ig}>
              <a
                href="https://www.instagram.com/soyhenry_ok/?hl=es"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </li>
            <li className={S.tw}>
              <a
                href="https://twitter.com/soyhenry_ok?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blank"
              >
                <FaTwitter />
              </a>
            </li>
            <li className={S.ldn}>
              <a
                href="https://www.linkedin.com/school/henryok/mycompany/"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className={S.noticias}>
          <h3>Leer mas</h3>
          <ul>
            <Link to={'/seccionNoticias'}>
              <li>Noticias</li>
            </Link>
            <Link to={'/galery'}>
              <li>Galería</li>
            </Link>
            <Link to={'/calendario'}>
              <li>Calendario</li>
            </Link>
          </ul>
        </div>

        <div className={S.actividades}>
          <h3>Actividades</h3>
          <ul>
            <Link to={'/futbol'}>
              <li>Fútbol</li>
            </Link>
            <Link to={'/hockey'}>
              <li>Hockey</li>
            </Link>
            <Link to={'/natacion'}>
              <li>Natación</li>
            </Link>
          </ul>
        </div>

        <div className={S.contacto}>
          <h3>Contacto</h3>
          <ul>
            <li>
              <FaEnvelope /> clubdehenry@gmail.com

            </li>
            <li>
              <FaPhoneAlt /> Tel: (011) - 555 - 7600
            </li>
            <Link to={'/contact-us'}>
              <p>
                <FaArrowRight /> Contactanos
              </p>
            </Link>
          </ul>
        </div>
      </div>
      <div className={S.copyright}>
        <p>
          Henry Club - <FaCopyright /> Copyright - 2022
        </p>
      </div>
    </div>
  );
}

