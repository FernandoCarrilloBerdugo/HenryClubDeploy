import { createNews } from '../../redux/Actions/Action';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import S from '../Form CrearNoticia/CrearNoticia.module.css';
import { FormGroup, Label, Input } from 'reactstrap';

// const schema = yup.object().shape({
//   foto: yup
//     .mixed()
//     .required('Necesitas subir una foto.')
//     .test('fileSize', 'El archivo es muy grande.', value => {
//       console.log(value);
//       return value && value[0].size <= 10000000;
//     })
//     .test('type', 'Solo se soporta archivos "JPG, JPEG ,PNG, SVG"', value => {
//       return (
//         (value && value[0].type === 'image/jpg') ||
//         value[0].type === 'image/jpeg' ||
//         value[0].type === 'image/png' ||
//         value[0].type === 'image/png'
//       );
//     }),
// });

export default function CrearAnuncio() {
  // estados:
  const dispatch = useDispatch();

  //CREAR UN USESELECTOR PARA EL ESTADO DE SPORTS
  // const noticias = useSelector(state => state.sports);

  const [error, setError] = useState('');

  const [input, setInput] = useState({
    id: '',
    title: '',
    subtitle: '',
    text: '',
    image: '',

    // news: [],
  });

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'HenryImagenes');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/proyectohenry/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log(file.secure_url);
    setInput(file.secure_url);
    setInput({ ...input, image: file.secure_url });
  };

  // useEffect(() => {
  //   dispatch(getNews());
  // }, []);

  // validaciones:
  function validarNombre(e) {
    let regTitulo = /\w/;
    if (regTitulo.test(e.target.value) && e.target.value.length > 150) {
      //fijarse RegEx
      setError('Datos Nombre Invalidos.');
    } else {
      setError('');
      handleChange(e);
    }
    // handleChange(e);
  }

  function validarSubtitulo(e) {
    let regSubt = /\w/;
    if (regSubt.test(e.target.value) && e.target.value.length > 255) {
      //fijarse RegEx
      setError('Datos Subtitulos Invalidos.');
    } else {
      setError('');
    }
    handleChange(e);
  }

  function validarTextNoticia(e) {
    let regText = /\w/;
    if (regText.test(e.target.value) && e.target.value.length < 20) {
      setError('Texto invalido.');
    } else {
      setError('');
    }
    handleChange(e);
  }

  //FIJARSE COMO VALIDAR EL INPUT FILE
  // function validarImagen(e) {
  //   if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.target.value)) {
  //     // fijarse RegEx que es igual a los demas PERO PARA IMAGENES DEL INPUT "FILE"
  //     setError('Formato de imagen invalido.');
  //   } else {
  //     setError('');
  //   }
  //   handleChange(e);
  // }

  async function handleSubit(e) {
    e.preventDefault();
    if (
      input.title &&
      typeof input.title === 'string' &&
      input.subtitle &&
      typeof input.subtitle === 'string' &&
      input.text
    ) {
      dispatch(createNews(JSON.parse(localStorage.getItem('data')).id, input));
      console.log(input);
      setInput({
        id: '',
        title: '',
        subtitle: '',
        text: '',
        image: '',

        // news: [],
      });

      alert('Noticia Creada');
    } else {
      alert('Todos los campos deben llenarse para publicar su noticia.');
    }
  }

  // function handleChange(e) {
  //   setInput({
  //     ...input,
  //     [e.target.title]: e.target.value,
  //   });
  // }

  const handleChange = e => {
    e.preventDefault();
    setInput(prevInput => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };

      return newInput;
    });
  };

  // const handleChangeFoto = e => {
  //   e.preventDefault();

  //   setInput(prevInput => {
  //     const inputFoto = {
  //       ...prevInput,
  //       [e.target.name]: e.target.files[0],
  //     };
  //     console.log(e.target.files[0]);
  //     return inputFoto;
  //   });
  // };

  console.log('hola', input.image);

  return (
    <div className={S.contenedorGeneral}>
      <h1 className={S.titulo}>Crear Noticias</h1>
      <form onSubmit={handleSubit} id="form" className={S.form}>
        <label className={S.labelTit}>Titulo de Noticia: </label>
        <input
          className={S.inputName}
          type="text"
          onChange={e => validarNombre(e)}
          name="title"
          value={input.title}
          placeholder="Titulo Noticia"
        />
        <div className={S.error}>
          <p>
            {error !== 'Datos Nombre Invalidos.' ? null : (
              <p>El nombre no puede superar los X caracteres.</p>
            )}
          </p>
        </div>
        <label className={S.labelSubt}>Subtitulo de Noticia: </label>
        <input
          className={S.inputSubt}
          type="text"
          onChange={validarSubtitulo}
          name="subtitle"
          // value={input.subtitle}
          placeholder="Subtitulo de Noticia"
        />
        <div className={S.error}>
          <p>
            {error !== 'Datos Subtitulos Invalidos.' ? null : (
              <p>
                El subtitulo de la noticia no puede superar los X caracteres.
              </p>
            )}
          </p>
        </div>
        <label className={S.labelDescr}>Descripción de Noticia: </label>
        <textarea
          className={S.textarea}
          name="text"
          id="text"
          cols="70"
          rows="10"
          placeholder="Escribe la noticia"
          onChange={validarTextNoticia}
        ></textarea>
        <div className={S.error}>
          <p>
            {error !== 'Texto invalido.' ? null : (
              <p>
                La descripcion no puede estar vacia y debe tener al menos 20
                caracteres.
              </p>
            )}
          </p>
        </div>
        {/* <label htmlFor="">Imagen de la Noticia: </label> */}
        {/* HACER ONCHANGE PARA INPUT FILE */}
        {/* <p>{'Solo se soporta archivos "JPG, JPEG ,PNG, SVG"'}</p> */}
        {/* onChange={validarImagen} */}
        {/* <input
          type="file"
          name="foto"
          onChange={handleChangeFoto}
          value={input.image}
        /> */}
        <FormGroup>
          <Label>Imagen</Label>
          <Input
            name="file"
            type="file"
            placeholder="Sube tu Imagen"
            onChange={uploadImage}
            value=""
          />
          <img
            src={
              input.image ||
              'https://www.yiwubazaar.com/resources/assets/images/default-product.jpg'
            }
          />
        </FormGroup>

        {/* {error.foto && <p>{error.foto.message}</p>}  */}
        {/* onChange={getNews} */}
        <button id="boton" value="Publicar" type="submit">
          <span>Publicar</span>
        </button>
      </form>
    </div>
  );
}
