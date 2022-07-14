import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { jasonWebToken } from '../../redux/Actions/Action';
import { Link } from 'react-router-dom';
// import { useLocalStorage } from '../../custom/useLocalStorage';
// import Google from './google.png';
// import Facebook from './facebook.png';
import logoHenry from '../../utils/fotos/LOGODIA.png';
// import Github from './github.png';
import s from './Login.module.css';
// import validate from './validate';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
// import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
// import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/Login/Login';

// aca

export default function Login() {
  //defino lo que va en los inputs
  const history = useHistory();
  const dispatch = useDispatch();
  // const {user, isAuthenticated, isLoading} = useAuth0()

  const [datos, setDatos] = useState({
    email: '',
    password: '',
  });

  // console.log(user)

  // const [cargandoUsuario, setCargandoUsuario] = useState(true);
  // const [token, setToken] = useState();

  //manejo de cambios para ir guardando lo que voy escribiendo
  const handleInputChange = e => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  //manejar el envio del formulario
  const handleSubmit = e => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log('no enviar');
    } else {
      // console.log(jasonWebToken(datos));
      dispatch(jasonWebToken(datos)).then(res => {
        console.log(localStorage.getItem('data'));
        if (JSON.parse(localStorage.getItem('data')).role.name === 'Admin') {
          history.push('/admin');
        } else {
          history.push('/home');
        }
      });
    }
  };

  const alertaLogin = () => {
    swal({
      title: '¡Sesión Iniciada!',
      icon: 'success',
      button: 'Ok.',
      timer: '2000',
    });
  };

  return (
    <div className={s.login}>
      <h1 className={s.loginTitle}>Welcome to Club Henry 👍</h1>
      <h3 className={s.loginTitle2}>Choose a Login Method</h3>

      <div className={s.wrapper}>
        <img src={logoHenry} width="350px" height="350px" alt="" />

        <div className={s.center}>
          <div className={s.line} />
          <div className={s.or}>
            <FaArrowRight />
          </div>
        </div>

        <form className={s.right} onSubmit={handleSubmit}>
          <input
            className={s.input}
            onChange={handleInputChange}
            value={datos.email}
            name="email"
            id="email"
            type="email"
            placeholder="E-mail..."
            autoComplete="off"
          />
          {/* {errors.email && <p className={s.errors}>{errors.email}</p>} */}
          <input
            className={s.input}
            onChange={handleInputChange}
            value={datos.password}
            name="password"
            id="password"
            type="password"
            placeholder="Password..."
            autoComplete="off"
          />
          {/* {errors.password && <p className={s.errors}>{errors.password}</p>} */}

          {/* HACER RENDERIZADO CONDICIONAL PARA USER O ADMIN */}

          <button
            onClick={() => alertaLogin()}
            className={s.submit}
            type="submit"
          >
            Iniciar Sesión
          </button>

          <br />

          <p>
            Aun no tienes cuenta? <Link to="/register">Registrate!</Link>
          </p>
        <LoginButton />
          </form>
      </div>
    </div>
  );
}
