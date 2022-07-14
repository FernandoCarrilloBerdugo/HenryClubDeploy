
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import S from '../../components/Contact/Contact.module.css';
import NavBar from '../../navbar/navbar';
import { useDispatch } from 'react-redux';
import { sendContact } from '../../redux/Actions/Action';
import validations from '../Contact/validate';
import PuffLoader from 'react-spinners/PuffLoader';
import swal from 'sweetalert';


export default function Contact() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [input, setInput] = useState({});

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendContact(input));
    swal({
      title: "¡Mensaje enviado!",
      text: "Recibiras una notificacion en tu correo en breve.",
      icon: "success",
      button: "Ok."
    })
  };

  return (
    <div className={S.contenedorGeneral}>
      {loading ? (
        <PuffLoader
          className={S.loader}
          display={'flex'}
          justify-content={'center'}
          margin={'auto'}
          align-items={'center'}
          size={200}
          background={'transparent'}
          color={'#e78345'}
          loading={loading}
        />
      ) : (
        <div>
          <NavBar />

          <div className={S.titulo}>
            <h2>Club Henry</h2>
            <h4 className={S.contactanos}>Contactanos</h4>
          </div>
          <div className={S.infoDatos}>
            <ul>
              <li>Direccion Av. Cifuentes 123 Buenos Aires, Argentina</li>
              <li>Tel: 555-7600</li>
              <li> email: clubdehenry@gmail.com</li>
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
      )}
    </div>
    //ver posibilidad de poner form para enviar correo de contacto
  );
}
