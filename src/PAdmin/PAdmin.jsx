import React from 'react';
import { Route, NavLink, Redirect, Link } from 'react-router-dom';
import Header from './headerAdmin/haaderAdmin';
import Socios from './Socios/Socios';
import Home from './Home2/Home2';
import News from './News2/News2';
import FormActiv from '../components/Form Create Activities/NewActivity';
import Createnews from '../components/Form CrearNoticia/CrearNoticia';
import Request from './Request/Request';
import EditNews from './EditNews/EditNews';
import Empleados from './Empleados/Empleados';
import Calendario from '../components/Calendario/Calendario';
import s from './Profile.module.css';

export default function PAdmin() {
  return JSON.parse(localStorage.getItem('data')) &&
    JSON.parse(localStorage.getItem('data')).role.name === 'Admin' ? (
    <>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.container}>
        <div className={s.barralateral}>
          <ul>
            {/* <li>
              <NavLink to="/admin/news">VISTA DE NOTICIAS</NavLink>
            </li> */}
            <li>
              <NavLink to="/admin/socios">VISTA SOCIOS</NavLink>
            </li>
            {/* <li>
              <NavLink to="/admin/home">Home</NavLink>
            </li> */}
            {/* <li>
              <NavLink to="/admin/newactivity">Crea Actividad</NavLink>
            </li> */}
            <li>
              <NavLink to="/admin/editnews">EDITAR NOTICIAS</NavLink>
            </li>
            <li>
              <NavLink to="/admin/calendario">Calendario</NavLink>
            </li>
            <li>
              <NavLink to="/admin/createnews">Crea Noticia</NavLink>
            </li>
            {/* <li>
              <NavLink to="/admin/request">MENSAJES</NavLink>
            </li>
            <li>
              <NavLink to="/admin/empleados">Panel de Trabajo</NavLink>
            </li> */}
          </ul>
        </div>
        <div className={s.mostrar}>
          <Route path="/admin/socios" component={Socios} />
          {/* <Route path="/admin/home" component={Home} /> */}
          {/* <Route path="/admin/news" component={News} /> */}
          <Route path="/admin/newactivity" component={FormActiv} />
          <Route path="/admin/createnews" component={Createnews} />
          {/* <Route path="/admin/request" component={Request} /> */}
          <Route path="/admin/editnews" component={EditNews} />
          <Route path="/admin/empleados" component={Empleados} />
          <Route path="/admin/calendario" component={Calendario} />
        </div>
      </div>
    </>
  ) : (
    // : <h1>No tienes acceso a esta página</h1>)
    <Redirect to="/home" />
  );
  // : <div>
  //   <h1>WoW! Such empty!</h1>
  //   <img src='https://assets.codepen.io/342414/internal/avatars/users/default.png?fit=crop&format=auto&height=256&version=2&width=256' />
  //   <Link to="https://c.tenor.com/Yar0zKi_W6IAAAAC/doge.gif" target="_blank">
  //   <button>I'm scared, take me home</button>
  //   </Link>
  // </div>)
}
