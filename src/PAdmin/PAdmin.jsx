import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Header from './headerAdmin/haaderAdmin';
import Socios from './Socios/Socios';
import FormActiv from '../components/Form Create Activities/NewActivity';
import Createnews from '../components/Form CrearNoticia/CrearNoticia';
import Request from './Request/Request';
import EditNews from './EditNews/EditNews';
import Empleados from './Empleados/Empleados';
import Calendario from '../components/Calendario/Calendario';
import Post from './Post/Post'
import s from './Profile.module.css';
import { PermIdentity, Storefront, WorkOutline } from "@material-ui/icons";
import EventNoteIcon from '@material-ui/icons/EventNote';

import AddAlbum from './AddImages/AddAlbum';

import Categorias from './Categorias/categorias';
import Deportes from './Deportes/deportes';

import AddImages from './AddImages/AddImages';
// import PAdminhome from './PAdminhome';

import Planes from './Planes/Planes'

export default function PAdmin() {
  return JSON.parse(localStorage.getItem('data')) &&
    JSON.parse(localStorage.getItem('data')).role.name === 'Admin' ? (
    <>
      <div className={s.header}>
        <Header />


      </div>
      <div className={s.container}>
        <div className={s.barralateral}>

          <div className={s.menu}>
            <h3 className={s.titulo}>SOCIOS</h3>
            <ul className={s.lista}>
              <NavLink to="/admin/socios" className={s.link}>
                <li className={s.item}>  <PermIdentity className={s.icon} /> Ver Socios</li>
              </NavLink>

            </ul>
          </div>

          <div className={s.menu}>
            <h3 className={s.titulo}>ACTIVIDAD</h3>
            <ul className={s.lista}>
              <NavLink to="/admin/newactivity" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Crea Actividad</li>
              </NavLink>
              <NavLink to="/admin/planes" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Ver Actividades</li>
              </NavLink>
              <NavLink to="/admin/post" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Newsletters</li>
              </NavLink>
              <NavLink to="/admin/request" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Requests</li>
              </NavLink>
              <NavLink to="/admin/Categorias" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Categorias</li>
              </NavLink>
              <NavLink to="/admin/Deportes" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Deportes</li>
              </NavLink>
              <NavLink to="/admin/agregarAlbum" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Crear album de fotos</li>
              </NavLink>
              <NavLink to="/admin/agregarImagen" className={s.link}>
                <li className={s.item}>  <Storefront className={s.icon} /> Subir fotos</li>
              </NavLink>
            </ul>
          </div>

          <div className={s.menu}>
            <h3 className={s.titulo}>NOTICIAS</h3>
            <ul className={s.lista}>
              <NavLink to="/admin/createnews" className={s.link}>
                <li className={s.item}>  <WorkOutline className={s.icon} /> Crea Noticias</li>
              </NavLink>
              <NavLink to="/admin/editnews" className={s.link}>
                <li className={s.item}>  <WorkOutline className={s.icon} /> Editar noticias</li>
              </NavLink>
            </ul>
          </div>

          <div className={s.menu}>
            <h3 className={s.titulo}>AGENDA</h3>
            <ul className={s.lista}>
              <NavLink to="/admin/calendario" className={s.link}>
                <li className={s.item}>  <EventNoteIcon className={s.icon} /> Calendario</li>
              </NavLink>
            </ul>
          </div>
          <div>


            {/* <div className={s.menu}>
              <h3 className={s.titulo}>AGENDA</h3>
              <ul className={s.lista}>
                <NavLink to="/admin/agregarImagen" className={s.link}>
                  <li className={s.item}>  <EventNoteIcon className={s.icon} /> Imagen</li>
                </NavLink>
              </ul>
            </div> */}

          </div>

        </div>

        <div className={s.mostrar}>
          <Route path="/admin/post" component={Post} />
          <Route path="/admin/socios" component={Socios} />
          <Route path="/admin/newactivity" component={FormActiv} />
          <Route path="/admin/createnews" component={Createnews} />
          <Route path="/admin/request" component={Request} />
          <Route path="/admin/editnews" component={EditNews} />
          <Route path="/admin/empleados" component={Empleados} />
          <Route path="/admin/calendario" component={Calendario} />
          <Route path="/admin/categorias" component={Categorias} />
          <Route path="/admin/deportes" component={Deportes} />
          <Route path="/admin/agregarImagen" component={AddImages} />
          <Route path="/admin/agregarAlbum" component={AddAlbum} />
          <Route path="/admin/planes" component={Planes} /> 
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
}
