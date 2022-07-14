import React from 'react';
// import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import logoHenry from '../../utils/fotos/logo.gif';
import NavBar from '../../navbar/navbar';
import Footer from '../footer/footer.jsx';
import './profile.css';
import {
  clearMemberDetail,
  detailMember,
  updateMember,
} from '../../redux/Actions/Action.js';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Modal from '../Calendario/Modal';
import { useState } from 'react';
// import Evento from '../Calendario/Evento';

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const details = useSelector(state => state.memberDetail);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    name: '',
    surname: '',
    username: '',
    photo: '',
  });

  const id = JSON.parse(localStorage.getItem('data')).id;
  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Usuario');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/proyectohenry/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log(file.secure_url);
    // setInput(file.secure_url);
    setInput({ ...input, photo: file.secure_url });
  };

  const HandleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const EditarMember = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(detailMember(id));

    return () => {
      dispatch(clearMemberDetail());
    };
  }, []);

  const GuardarCambios = id => {
    console.log(input.name);
    if (details.name && details.surname || details.photo) {
      dispatch(
        updateMember(JSON.parse(localStorage.getItem('data')).id, input)
      );
      window.location.reload(true)
      swal({
        title: 'Perfil modificado',
        icon: 'success',
        timer: "1000"
      });
      setModal(false)
      dispatch(detailMember());


    }

  };
  // const myProfile = useSelector((state) => state.detail);

  const comprar = async () => {
    await fetch('https://mp-testeo.herokuapp.com/payment')
      .then(e => e.json())
      .then(e => window.open(e.url, '_blank'));
  };
  return (
    <div className="contenedorGeneral">
      <NavBar />

      {!!Object.keys(details).length && console.log(details)}
      <h1 className="tituloPerfil">¡ Bienvenido {details.username} !</h1>

      <div className="contenido">
        <div className="fotoDePefil">
          <img
            src={
              details.photo
                ? details.photo
                : 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png'
            }
            alt="foto de perfil"
          />
          <button onClick={EditarMember}>Editar perfil</button>
        </div>
        {/* <div className="botonesPerfil">
        </div> */}
        <Modal estado={modal} cambiarEstado={setModal}>
          <div className="modalEdit">
            <h2>Editar Perfil:</h2>
            <form>
              <h5 className="h5">Nombre: </h5>
              <input
                name="name"
                type="text"
                value={input.name}
                onChange={HandleChange}
              />
              <h5 className="h5">Apellido: </h5>
              <input
                name="surname"
                type="text"
                value={input.surname}
                onChange={HandleChange}
              />
              <h5 className="h5">Nombre de usuario: </h5>
              <input
                name="username"
                type="text"
                value={input.username}
                onChange={HandleChange}
              />
              <input
                className="selectPhoto"
                name="file"
                type="file"
                placeholder="Sube tu Imagen"
                onChange={uploadImage}
                value=""
              />
            </form>
            <img
              className="fotoDefault"
              src={
                input.photo ||
                'https://www.yiwubazaar.com/resources/assets/images/default-product.jpg'
              }
              alt="Foto de perfil"
            />
            <button onClick={GuardarCambios}>Ok</button>
          </div>
        </Modal>
        <div className="datosUsuario">
          <h1>DATOS DE USUARIO:</h1>
          <h4>Nombre: {details.name}</h4>
          <h4>Apellido: {details.surname}</h4>
          <h4>Nombre De Usuario: {details.username}</h4>
          <h4>Dirección: {details.address}</h4>
          <h4>Teléfono: {details.phone}</h4>
          <h4>E-mail: {details.email}</h4>
          <h4>Dni: {details.dni}</h4>
        </div>

        <div className="datosDeUsuario">
          {JSON.parse(localStorage.getItem('data')).isOlder === false ? (
            <div className="datosTutor">
              <h1>DATOS DEL TUTOR:</h1>
              <h4>Nombre: {details.tutorName}</h4>
              <h4>Teléfono: {details.tutorPhone}</h4>
              <h4>E-mail: {details.tutorEmail}</h4>
            </div>
          ) : (
            <div></div>
          )}

          {/* <div className="inscripciones">
            <div className="aPagar">
              <h2 className="aranceles">Aranceles: </h2>
              <h4 className="precio">total a pagar: $900</h4>
              <Link>
                <button onClick={comprar}>Pagar</button>
              </Link>
            </div>
          </div> */}
        </div>
        <div>
          {/* <Evento /> */}
          <div>
          <h2>Actividades</h2>
          {details.hasOwnProperty("inscriptions") && details.inscriptions.map((inscription, i ) => (
            <div key={i} className='activityCard'>
              <h3>Actividad</h3>
              {inscription.CategorySport.description}
              <h3>Horario</h3>
              <span>De: {inscription.CategorySport.start} hasta: {inscription.CategorySport.finish}</span>
              <h3>El día: {inscription.CategorySport.day}</h3>
            </div>
          ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

