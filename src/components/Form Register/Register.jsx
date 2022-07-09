import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMember } from '../../redux/Actions/Action';
import validate from './Validations/validations';
import { Link } from 'react-router-dom';
import style from './Register.module.css';
import { useHistory } from 'react-router-dom';
import logoHenry from '../../utils/fotos/LOGODIA.png';
import swal from 'sweetalert';
import { boolean } from 'yup';

export default function Register() {
  const dispatch = useDispatch();

  const history = useHistory();
  const [inputs, setInputs] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    dni: '',
    age: '',
    username: '',
    password: '',
    passwordTwo: '',
    tutorName: '',
    tutorPhone: '',
    tutorEmail: '',
    isOlder: '',
  });

  // function isOlder(){
  //   const input = e.target.value
  //   if (input.edad >= 18) {
  //     input.isOlder = true;
  //   } else {
  //     input.isOlder = false;
  //   }
  // }

  //Para renderizar mensajes de error
  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);
  const {
    name,
    surname,
    email,
    address,
    phone,
    dni,
    age,
    username,
    password,
    passwordTwo,
    tutorName,
    tutorPhone,
    tutorEmail,
    isOlder,
  } = inputs;

  const HandleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  function handlePasswordEqual(e) {
    setInputs({
      ...inputs,
      passwordTwo: e.target.value,
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    setError(validate(inputs));
    if (Object.keys(error).length > 0) {
      alert(`falta ${Object.keys(error)}`);
    } else if (
      name &&
      surname &&
      email &&
      address &&
      phone &&
      // ver validacion de telefono
      dni &&
      age &&
      username &&
      password &&
      passwordTwo
    ) {
      swal({
        title: '¡Usuario creado!',
        icon: 'success',
        button: 'Ok.',
      });
      setLoading(true);
      console.log('hola');
      dispatch(createMember(inputs));
      setLoading(false);
      history.push('/home');
    }
  };

  return (
    <div className={style.container}>
      <img src={logoHenry} width="150px" height="150px" alt="" />
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={onSubmit}>
          <div className={style.inputContainer}>
            <div className={style.column1}>
              <div>
                {error.name && <p className={style.error}>{error.name}</p>}
                <label className={style.tag}>Nombre</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={name}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Nombre..."
                  autoComplete="off"
                />
              </div>
              <div>
                {error.surname && (
                  <p className={style.error}>{error.surname}</p>
                )}
                <label className={style.tag}>Apellido</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={surname}
                  name="surname"
                  id="surname"
                  type="text"
                  placeholder="Apellido..."
                  autoComplete="off"
                />
              </div>
              <div>
                {error.phone && <p className={style.error}>{error.phone}</p>}
                <label className={style.tag}>Número de teléfono</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={phone}
                  name="phone"
                  id="phone"
                  type="string"
                  placeholder="555..."
                  autoComplete="off"
                />
              </div>
              <div>
                {error.email && <p className={style.error}>{error.email}</p>}
                <label className={style.tag}>Email/Correo</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={email}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email..."
                  autoComplete="off"
                />
              </div>

              <label className={style.tag}>Dirección</label>
              <input
                className={style.input}
                onChange={HandleChange}
                type="text"
                name="address"
                id="address"
                value={address}
                placeholder="Escribe tu dirección..."
              />
            </div>

            <div className={style.column2}>
              <div>
                {error.dni && <p className={style.error}>{error.dni}</p>}
                <label className={style.tag}>DNI</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={dni}
                  name="dni"
                  id="dni"
                  type="string"
                  placeholder="8888..."
                  autoComplete="off"
                />
              </div>
              <div>
                {error.age && <p className={style.error}>{error.age}</p>}
                <label className={style.tag}>Edad</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={age}
                  name="age"
                  id="age"
                  type="number"
                  placeholder="Edad"
                  autoComplete="off"
                />
                {age < 18 ? (
                  <div className={style.datosTutor}>
                    <h2>Datos de tutor: </h2>
                    <div>
                      <label className={style.tag}>Nombre del tutor: </label>
                      <input
                        className={style.input}
                        onChange={HandleChange}
                        value={tutorName}
                        type="text"
                        name="tutorName"
                        id="nameTutor"
                        placeholder="Nombre del tutor."
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label className={style.tag}>Teléfono del tutor: </label>
                      <input
                        className={style.input}
                        onChange={HandleChange}
                        value={tutorPhone}
                        type="string"
                        name="tutorPhone"
                        id="telTutor"
                        placeholder="Teléfono del tutor."
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label className={style.tag}>Email del tutor: </label>
                      <input
                        className={style.input}
                        onChange={HandleChange}
                        value={tutorEmail}
                        type="text"
                        name="tutorEmail"
                        id="emailTutor"
                        placeholder="Email del tutor."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div>
                {error.username && (
                  <p className={style.error}>{error.username}</p>
                )}
                <label className={style.tag}>Nombre de usuario</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={username}
                  name="username"
                  id="username"
                  type="string"
                  placeholder="Nombre de usuario..."
                  autoComplete="off"
                />
              </div>
              <div>
                <p>Al menos 1 letra y 1 número</p>
                {error.password && (
                  <p className={style.error}>{error.password}</p>
                )}
                <label className={style.tag}>Contraseña</label>
                <input
                  className={style.input}
                  onChange={HandleChange}
                  value={password}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Contraseña..."
                  autoComplete="off"
                />
              </div>

              <div>
                <p>Al menos 1 letra y 1 número</p>
                {error.passwordTwo && (
                  <p className={style.error}>{error.passwordTwo}</p>
                )}
                <label className={style.tag}>Repite tu contraseña</label>
                <input
                  className={style.input}
                  onChange={handlePasswordEqual}
                  value={passwordTwo}
                  name="passwordTwo"
                  id="passwordTwo"
                  type="password"
                  placeholder="Repite tu contraseña..."
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <button type="submit">Registrarme</button>
        </form>
        <p>
          ¿Ya tienes una cuenta?<span> </span>
          <Link to="/login">¡Inicia Sesión!</Link>
        </p>
        <div className="abajo"></div>
      </div>
    </div>
  );
}
