
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {getContacts,deleteContact} from "../../redux/Actions/Action";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

export default function Request () {
  const styles =useStyles()
  const dispatch= useDispatch()
  const contacts = useSelector((state) => state.contacts);
  const [deleteModal, setdeleteModal]= useState (false);
  const [deleteId, setDeleteId] = useState('');


  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);



  const BorrarMember = () => {
    dispatch(deleteContact(deleteId))
    .then(res => dispatch(getContacts()))
    .then(res =>
      swal({
        title: '¡Mensaje Eliminado!',
        icon: 'success',
        button: 'Ok.',
      }))
    abricerrarMEliminar()
  };

  const abricerrarMEliminar=() =>{
    setdeleteModal(!deleteModal)
  };

  const selectAction = (e, caso) => {
    setDeleteId(e.id);
    
    caso === 'Eliminar'&& abricerrarMEliminar()
  };
  const bodyEliminar=(
    <div className={styles.modal}>
    <p>Are you sure you want to delete this contact message de <b>{contacts.name}</b>?</p>
      <div align="right">
        <Button color="primary" onClick={BorrarMember} >SI</Button>
        <Button onClick={abricerrarMEliminar} >NO</Button>
      </div>
    </div>
  )
  
  return (
    <>
     <br />
     <p> contact messages</p>
    <br />
  <TableContainer>
<Table>
<TableHead>
<TableRow>
<TableCell>Name</TableCell>
<TableCell>Surname</TableCell>
<TableCell>Message</TableCell>
<TableCell>Phone</TableCell>
<TableCell>Email</TableCell>
<TableCell>Eliminar</TableCell>
</TableRow>
</TableHead>
<TableBody>
    {contacts.map(e=>(
      <TableRow key={e.id}> 
      <TableCell>{e.name}</TableCell>
      <TableCell>{e.surname}</TableCell>
      <TableCell>{e.message}</TableCell>
      <TableCell>{e.phone}</TableCell>
      <TableCell>{e.email}</TableCell>
      <TableCell><Delete className={styles.iconos} onClick={() => selectAction(e, 'Eliminar')}/>
      </TableCell>
      </TableRow> ) )}
</TableBody>
</Table>
  </TableContainer>
<Modal open={deleteModal} onClose={abricerrarMEliminar}>{bodyEliminar}</Modal>

    </>
  );

 };
    
