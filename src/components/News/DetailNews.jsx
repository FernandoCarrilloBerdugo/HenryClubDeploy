import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearPage,
  createComment,
  detailNews,
  // getComments,
} from '../../redux/Actions/Action';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import swal from 'sweetalert';

export default function NewsDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const noticia = useSelector(state => state.newsDetail);

  // const comentario = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(detailNews(id));

    return () => {
      dispatch(clearPage());
    };
  }, []);

  const [error, setError] = useState('');

  const [localState, setLocalState] = useState({
    name: '',
    comment: '',
  });

  function handleChange(e) {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      localState.comment &&
      localState.comment.trim() !== '' &&
      typeof localState.comment === 'string'
    ) {
      dispatch(
        createComment(
          id,
          JSON.parse(localStorage.getItem('data')).id,
          localState
        )
      );
      setLocalState({
        name: '',
        comment: '',
      });
      alert('Comentario Enviado');
      dispatch(detailNews(id));
      // swal({
      //   title: '¡Comentario enviado!',
      //   icon: 'success',
      //   button: 'Ok.',
      // });
    } else {
      swal({
        title: '¡Ups!',
        text: 'Todos los campos deben llenares para la enviar su comentario.',
        icon: 'error',
        button: 'Ok.',
      });
    }
  }

  // function handleDelete(e) {
  //   setLocalState({
  //     ...localState,
  //     comentario: localState.comentario.filter(comment => comment !== e),
  //   });
  // }

  return (
    <div className="containerTotal">
      <Link to={'/home'}>
        <button>
          <span>Volver</span>
        </button>
      </Link>
      <div className="detalleNoticia">
        {
          <div>
            <h2 className="noticiaTitulo"> {noticia.title}</h2>
            <img
              src={
                noticia.image
                  ? noticia.image
                  : 'https://pbs.twimg.com/profile_images/631795502665756672/fZ5AQUNF_400x400.jpg'
              }
              alt="img not found"
            />
            <h4 className="noticiaSubtitulo">{noticia.subtitle}</h4>
            <p className="noticiaTexto"> {noticia.text} </p>
          </div>
        }
      </div>
      <div className="seccionComentarios">
        <section>
          <h3>Comentarios:</h3>
          <div className="seccionComentariosHechos">
            <div>
              <div className="comentariosHechos">
                {noticia.comments?.map((comment, i) => (
                  <div className="containerComment" key={i}>
                    <h3>
                      {comment.user && comment.user.hasOwnProperty('username')
                        ? comment.user.username
                        : comment.user.name}
                      :
                    </h3>
                    <h4>{comment.comment}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BOTON PARA BORRAR COMENTARIO */}
        {/* <div>
          {localState.comentario.map((el, index) => (
            <div key={index}>
              <div>
                <p>{el}</p>
                <button onClick={() => handleDelete(el)}>X</button>
              </div>
            </div>
          ))}
        </div> */}
        <hr />
        <section className="sectionEscribirComentario">
          <h3>Escribe un comentario:</h3>

          {localStorage.getItem('data') ? (
            <div>
              {JSON.parse(localStorage.getItem('data')).name}

              <div>
                <textarea
                  id=""
                  name="comment"
                  cols="50"
                  value={localState.comment}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Escribe tu comentario..."
                ></textarea>
              </div>
              <div className="enviarComentario">
                <button onClick={handleSubmit} type="button">
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          ) : (
            <span>
              <Link to={'/register'}>Registrate </Link> o
              <Link to={'/login'}> Inicia Sesión</Link>
            </span>
          )}
        </section>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
