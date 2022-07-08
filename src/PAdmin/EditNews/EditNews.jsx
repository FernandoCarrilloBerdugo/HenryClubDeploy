import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { getNews, deleteNews, updateNews } from '../../redux/Actions/Action';
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  iconos: {
    cursor: 'pointer',
  },
  inputMaterial: {
    width: '100%',
  },
}));

export default function EditNews() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  const [putModal, setputModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState('');

  const [input, setInput] = useState({
    title: '',
    subtitle: '',
    image: '',
  });

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const HandleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const BorrarNews = () => {
    dispatch(deleteNews(id))
      .then(res => dispatch(getNews()))
      .then(res => {
        swal({
          title: 'Noticia eliminada.',
          icon: 'success',
          button: 'Ok.',
        });
        abricerrarMEliminar();
      });
  };

  const EditNews = () => {
    dispatch(updateNews(id, input))
      .then(res => dispatch(getNews()))
      .then(res => {
        swal({
          title: 'Noticia modificada.',
          icon: 'success',
          button: 'Ok.',
        });
        abricerrarMEdit();
      });
  };

  const abricerrarMEdit = () => {
    setputModal(!putModal);
  };

  const abricerrarMEliminar = () => {
    setdeleteModal(!deleteModal);
  };

  const selectAction = (e, caso) => {
    setId(e.id);
    setInput(e);
    caso === 'Editar' ? abricerrarMEdit() : abricerrarMEliminar();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Edit News</h3>
      <TextField
        className={styles.inputMaterial}
        label="Title"
        name="title"
        onChange={HandleChange}
        value={input && input.title}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Subtitle"
        name="subtitle"
        onChange={HandleChange}
        value={input && input.subtitle}
      />
      <br />
      {/* <TextField className={styles.inputMaterial} label="Comentarios" name="comentario" onChange={HandleChange} value={input&&input.image} /> */}
      {/* <br /> */}
      <div align="right">
        <Button color="primary" onClick={EditNews}>
          Editar
        </Button>
        <Button onClick={abricerrarMEdit}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        ¿Estás seguro que deseas eliminar esta noticia?{' '}
        <b>{input && input.title}</b>
      </p>
      <div align="right">
        <Button color="primary" onClick={BorrarNews}>
          SI
        </Button>
        <Button onClick={abricerrarMEliminar}>NO</Button>
      </div>
    </div>
  );

  console.log(news);

  return (
    <>
      <br />
      <p>Editar News</p>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Id</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              {/* <TableCell>Image</TableCell> */}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.subtitle}</TableCell>
                {/* <TableCell>{e.image}</TableCell> */}
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => selectAction(e, 'Editar')}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => selectAction(e, 'Eliminar')}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={putModal} onClose={abricerrarMEdit}>
        {bodyEditar}
      </Modal>
      <Modal open={deleteModal} onClose={abricerrarMEliminar}>
        {bodyEliminar}
      </Modal>
    </>
  );
}
