import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Delete } from '@material-ui/icons';
import './categorias.css'
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  Button,
  TableContainer,
  TableCell,
  TableBody,
  TextField,
  TableRow,
  Modal,
} from '@material-ui/core';
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  banMember,
} from '../../redux/Actions/Action';
import { FaBan } from "react-icons/fa";
import swal from 'sweetalert';


export default function Categorias() {

  const dispatch = useDispatch();

  const categories = useSelector(state => state.category)

  const [insertModal, setinsertModal] = useState(false);
  const [putModal, setputModal] = useState(false);
  const [activateModal, setactivateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');

  const [input, setInput] = useState({
    name: ""
  })

  useEffect(() => {
    dispatch(getCategory())
  }, [])

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

  const styles = useStyles();

  const HandleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //                                    DISPATCH PARA LOS BOTONES

  const crearCategoría = e => {
    e.preventDefault();
    dispatch(createCategory(input))
      .then(res => dispatch(getCategory()))
      .then(res =>
        swal({
          title: '¡Categoría Creada!',
          icon: 'success',
          button: 'Ok.',
        })
      );
    abricerrarMInsert();
  };

  const activarCategoría = e => {
    e.preventDefault()
    // dispatch(banMember(deleteId, input))
    //   .then(res => dispatch(getCategory()))
    //   .then(res => abricerrarMActivar());
    swal({
      title: 'Función no implementada',
      icon: 'success',
      button: 'Ok.',
    });
  };

  const editarCategoría = id => {
    console.log(input);
    dispatch(updateCategory(editId, input))
      .then(res => dispatch(getCategory()))
      .then(res => {
        abricerrarMEdit();
        swal({
          title: 'Categoría modificada',
          icon: 'success',
          button: 'Ok.',
        });
      });
  };

  const eliminarCategoría = e => {
    e.preventDefault()
    dispatch(deleteCategory(editId))
      .then(res => dispatch(getCategory()))
      .then(res => {
        abricerrarMEliminar();
        swal({
          title: 'Categoría Eliminada',
          icon: 'success',
          button: 'Ok.',
        });
      });
  };

  const abricerrarMInsert = () => {
    setinsertModal(!insertModal);
  };
  const abricerrarMEdit = () => {
    setputModal(!putModal);
  };

  const abricerrarMActivar = () => {
    setactivateModal(!activateModal);
  };

  const abricerrarMEliminar = () => {
    setDeleteModal(!deleteModal);
  };

  const selectAction = (e, caso) => {
    setDeleteId(e.id);
    setEditId(e.id);
    setInput(e);
    if(caso === 'Editar') abricerrarMEdit()
    else if(caso === 'Activar') abricerrarMActivar()
    else if(caso === 'Eliminar') abricerrarMEliminar()
  };

  //                Modal Crear
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Nueva Categoría</h3>
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={HandleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={crearCategoría}>
          Insertar
        </Button>
        <Button onClick={abricerrarMInsert}>Cancelar</Button>
      </div>
    </div>
  );

  //                    Modal Editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Categoría</h3>
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={HandleChange}
        value={input && input.name}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={editarCategoría}>
          Editar
        </Button>
        <Button onClick={abricerrarMEdit}>Cancelar</Button>
      </div>
    </div>
  );

  //              Modal activar/desactivar
  const bodyActivar = (
    <div className={styles.modal}>
      <p>
        ¿Estás seguro que deseas activar la categoría <b>{input && input.name}</b>?
      </p>
      <div align="right">
        <Button color="primary" onClick={activarCategoría}>
          SI
        </Button>
        <Button onClick={abricerrarMActivar}>NO</Button>
      </div>
    </div>
  );

  //              Modal Eliminar
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        ¿Estás seguro que deseas eliminar la categoría <b>{input && input.name}</b>?
      </p>
      <div align="right">
        <Button color="primary" onClick={eliminarCategoría}>
          SI
        </Button>
        <Button onClick={abricerrarMEliminar}>NO</Button>
      </div>
    </div>
  );

  return (
    <div>
      <br />
      <Button onClick={abricerrarMInsert}>
        Nuevo Categoría
      </Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          {/*                           Inicia header de tabla                     */}
          <TableRow>
            <TableCell>
              Categoría
            </TableCell>

            <TableCell>
              Editar
            </TableCell>

            <TableCell>
              Activar/Desactivar
            </TableCell>

            <TableCell>
              Eliminar
            </TableCell>
          </TableRow>
          {/* |                           Termina header de tabla                  */}
          <TableBody>
            {!!categories.length && categories.map((category, i) => (
              <TableRow key={i}>
                <TableCell>
                  {category.name}
                </TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => selectAction(category, 'Editar')}
                  />
                  &nbsp;&nbsp;&nbsp;
                </TableCell>
                <TableCell>
                <FaBan
                      className={styles.iconos}
                      onClick={() => selectAction(category, 'Activar')}
                    />
                </TableCell>
                <TableCell>
                  <Delete
                    className={styles.iconos}
                    onClick={() => selectAction(category, 'Eliminar')}
                  />
                  &nbsp;&nbsp;&nbsp;
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={insertModal} onClose={abricerrarMInsert}>
        {bodyInsertar}
      </Modal>

      <Modal open={putModal} onClose={abricerrarMEdit}>
        {bodyEditar}
      </Modal>

      <Modal open={activateModal} onClose={abricerrarMActivar}>
        {bodyActivar}
      </Modal>

      <Modal open={deleteModal} onClose={abricerrarMEliminar}>
        {bodyEliminar}
      </Modal>

    </div>
  )
}
