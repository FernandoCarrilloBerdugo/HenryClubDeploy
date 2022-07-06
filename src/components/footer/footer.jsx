import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaArrowRight, FaCopyright } from "react-icons/fa"
import S from '../footer/footer.module.css';
import {Link} from 'react-router-dom'
export default function footer() {
  return (
    <div>
    <div className={S.contenedorGeneral}>
        <div className={S.redes}>
          <h3>Redes Sociales</h3>
          <ul>
              <li className={S.fb}><FaFacebook /></li>
              <li className={S.ig}><FaInstagram /></li>
              <li className={S.tw}><FaTwitter /></li>
          </ul>
        </div>

        <div className={S.noticias}>
          <h3>Leer mas</h3>
          <ul>
            <li>Mas noticias</li>
            <li>Mas noticias</li>
            <li>Mas noticias</li>
          </ul>
        </div>

        <div className={S.actividades}>
          <h3>Actividades</h3>
          <ul>
            <li>Deportes</li>
            <li>Shows</li>
            <li>Algo mas</li>
          </ul>
        </div>

        <div className={S.contacto}>
          <h3>Contacto</h3>
          <ul>
            <li><FaEnvelope /> EMAIL@EMAIL.COM</li>
            <li><FaPhoneAlt /> Tel: (011)-4444-5873</li>
            <Link to={'/contact-us'}>
            <p><FaArrowRight /> Contactanos</p>
            </Link>
          </ul>
        </div>

      
    </div>
    <div className={S.copyright}>
          <p>Henry Club - <FaCopyright /> Copyright - 2002</p>
        </div>
    </div>
  )
}


