import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, Delete } from '@material-ui/icons';
import './deportes.css'
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
  getSport,
  createSport,
  updateSport,
  deleteSport,
  banMember,
} from '../../redux/Actions/Action';
import { FaBan } from "react-icons/fa";
import swal from 'sweetalert';


export default function Deportes() {

  const dispatch = useDispatch();

  const sports = useSelector(state => state.sport)

  const [insertModal, setinsertModal] = useState(false);
  const [putModal, setputModal] = useState(false);
  const [activateModal, setactivateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');

  const [input, setInput] = useState({
    name: "",
    change: "",
  })

  useEffect(() => {
    dispatch(getSport())
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
    const { value } = e.target;
    setInput({ ...input, change: value });
  };

  const handleChangeCreate = e => {
    e.preventDefault();
    const { value } = e.target;
    setInput({...input, name: value})
  }
  //                                    DISPATCH PARA LOS BOTONES

  const crearDeporte = e => {
    e.preventDefault();
    dispatch(createSport(input))
      .then(res => dispatch(getSport()))
      .then(res =>
        swal({
          title: '¡Deporte Creado!',
          icon: 'success',
          button: 'Ok.',
        })
      );
    abricerrarMInsert();
  };

  const activarDeporte = e => {
    e.preventDefault()
    // dispatch(banMember(deleteId, input))
    //   .then(res => dispatch(getSport()))
    //   .then(res => abricerrarMActivar());
    swal({
      title: 'Función no implementada .',
      icon: 'success',
      button: 'Ok.',
    });
    abricerrarMActivar()
  };

  const editarDeporte = id => {
    console.log(input);
    dispatch(updateSport(input))
      .then(res => dispatch(getSport()))
      .then(res => {
        abricerrarMEdit();
        swal({
          title: 'Deporte modificado',
          icon: 'success',
          button: 'Ok.',
        });
      });
  };

  const eliminarDeporte = e => {
    e.preventDefault()
    dispatch(deleteSport(deleteId))
      .then(res => dispatch(getSport()))
      .then(res => {
        abricerrarMEliminar();
        swal({
          title: 'Deporte Eliminado',
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
    // setEditId(e.id);
    setInput({
      ...input,
      name: e.name
    });
    if(caso === 'Editar') abricerrarMEdit()
    else if(caso === 'Activar') abricerrarMActivar()
    else if(caso === 'Eliminar') abricerrarMEliminar()
  };

  //                Modal Crear
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Nueva Deporte</h3>
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={handleChangeCreate}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={crearDeporte}>
          Insertar
        </Button>
        <Button onClick={abricerrarMInsert}>Cancelar</Button>
      </div>
    </div>
  );

  //                    Modal Editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Deporte</h3>
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={HandleChange}
        value={input && input.change}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={editarDeporte}>
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
        ¿Estás seguro que deseas activar la Deporte <b>{input && input.name}</b>?
      </p>
      <div align="right">
        <Button color="primary" onClick={activarDeporte}>
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
        ¿Estás seguro que deseas eliminar la Deporte <b>{input && input.name}</b>?
      </p>
      <div align="right">
        <Button color="primary" onClick={eliminarDeporte}>
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
        Nuevo Deporte
      </Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          {/*                           Inicia header de tabla                     */}
          <TableRow>
            <TableCell>
              Deporte
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
            {!!sports.length && sports.map((sport, i) => (
              <TableRow key={i}>
                <TableCell>
                  {sport.name}
                </TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => selectAction(sport, 'Editar')}
                  />
                  &nbsp;&nbsp;&nbsp;
                </TableCell>
                <TableCell>
                <FaBan
                      className={styles.iconos}
                      onClick={() => selectAction(sport, 'Activar')}
                    />
                </TableCell>
                <TableCell>
                  <Delete
                    className={styles.iconos}
                    onClick={() => selectAction(sport, 'Eliminar')}
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
