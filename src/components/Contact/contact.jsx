import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import S from '../../components/Contact/Contact.module.css';
import NavBar from '../../navbar/navbar';
import { useDispatch } from 'react-redux';
import { sendContact } from '../../redux/Actions/Action';
import validations from './validate';

export default function Contact() {
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [input, setInput] = useState({});

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setError(
    //   validations({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handleSubmit = e => {
    e.preventDefault();
      dispatch(sendContact(input));  
  };

  return (
    <div className={S.contenedorGeneral}>
      <NavBar />

      <div className={S.titulo}>
        <h2>Club Henry</h2>
        <h4 className={S.contactanos}>Contactanos</h4>
      </div>
      <div className={S.infoDatos}>
        <ul>
          <li>Direccion Av. Cifuentes 123 Buenos Aires, Argentina</li>
          <li>Tel: 555-7600 (líneas rotativas)</li>
          <li> email: comunicaciones@clubhenry.org.ar</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className={S.form}>
        <label htmlFor="">Nombre: </label>
        <input onChange={handleChange} type="text" name="name" />
        {error.name && <span className={S.error}>{error.name}</span>}

        <label htmlFor="">Apellido: </label>
        <input onChange={handleChange} type="text" name="surname" id="" />
        {error.surname && <span className={S.error}>{error.surname}</span>}

        <label htmlFor="">Email: </label>
        <input onChange={handleChange} type="email" name="email" id="" />
        {error.email && <span className={S.error}>{error.email}</span>}

        <label htmlFor="">Teléfono de contacto: </label>
        <input
          onChange={handleChange}
          type="tel"
          id="phone"
          name="phone"
          required
        ></input>
        {error.phone && <span className={S.error}>{error.phone}</span>}
        <label htmlFor="">Mensaje: </label>
        <textarea
          name="message"
          id=""
          cols="50"
          rows="10"
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
        ></textarea>
        {error.message && <span className={S.error}>{error.message}</span>}
        <div>
          <button type="submit">
            <span>Enviar</span>
          </button>
        </div>
      </form>
      {/* <div className={S.botonVolver}>
        <Link to={'/home'}>
          <button>Regresar</button>
        </Link>
      </div> */}

      <Footer />
    </div>
    //ver posibilidad de poner form para enviar correo de contacto
  );
}
