import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow,TextField, Modal, Button, Select, MenuItem,InputLabel} from "@material-ui/core";
import { deleteCategorySport,putCategorySport,getCategorySport, getCategory, getSport, getTeacher, } from "../../redux/Actions/Action";
import {Edit, Delete } from '@material-ui/icons';
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

export default function Planes() {
 const view = useSelector(state =>state.categorySport)
  const styles =useStyles()
  const dispatch= useDispatch()
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
const state = useSelector(state => state);
  const [putModal, setputModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const [input, setInput] = useState({
    sportId: '',
    categoryId: '',
    day: '',
    start: '',
    finish: '',
    fee: '',
    userId: '',
  });

  useEffect(() => {
    dispatch(getCategorySport())
    dispatch(getCategory());
    dispatch(getTeacher());
    dispatch(getSport());
}, [])



  const eliminarplan = () => {
    dispatch(deleteCategorySport(deleteId))
      .then(res => dispatch( getCategorySport()))
      .then(res => abricerrarMEliminar());
    swal({
        title: 'Socio eliminado.',
        icon: 'success',
        button: 'Ok.',
      });
  };
  const EditarPLan = ()=> {
    dispatch(putCategorySport(editId, input))
      .then(res => dispatch( getCategorySport()))
      .then(res => {
        abricerrarMEdit();
        swal({
          title: 'Plan modificado',
          icon: 'success',
          button: 'Ok.',
        });
      });
  };

  const HandleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

 const abricerrarMEliminar=() =>{
    setdeleteModal(!deleteModal)
  };
  const abricerrarMEdit = () => {
    setputModal(!putModal);
  };
  const selectAction = (e, caso) => {
    setDeleteId(e.id);
    setEditId(e.id);
    setInput(e);
    caso === 'Editar' ? abricerrarMEdit() : abricerrarMEliminar();
  };

 

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Plan</h3>
      <TextField className={styles.inputMaterial} label="Day" name="day" onChange={HandleChange} value={input && input.day} />
      <br />
      <TextField className={styles.inputMaterial} label="Start" name="start"  onChange={HandleChange}  value={input && input.start}  />
      <br />
      <TextField className={styles.inputMaterial}  label="Precio" name="fee"  onChange={HandleChange}  value={input && input.fee} />
      <br />
      <TextField   className={styles.inputMaterial}  label="Description"   name="description"   onChange={HandleChange} value={input && input.description}  />
      <br />
      <>
     <InputLabel>Deporte</InputLabel>
      <Select 
       className={styles.inputMaterial} value={input.sportId} labelId="sportId" name="sportId"
        onChange={HandleChange}  >
            <option value=""> Seleccionar Deporte</option>
              {state.sport &&  state.sport.map((sportId) => (
              <MenuItem key={sportId.id} value={sportId.id}>{sportId.name} </MenuItem>
                ))}
      </Select></>
      <br />
      <br />
      <>
      <InputLabel>Profesor</InputLabel>
      <Select  className={styles.inputMaterial}  value={input.userId}   labelId="userId" name="userId"
       onChange={HandleChange} > 
      <option value=""> Seleccionar Deporte</option>
      {state.teacher && state.teacher.map((userId) => (
      <MenuItem key={userId.id} value={userId.id}>{userId.name}</MenuItem>))}
      </Select></>
      <br />
      <br />
      <>
      <InputLabel>Categoria</InputLabel>
      <Select className={styles.inputMaterial} value={input.categoryId} labelId="categoryId" 
      name="categoryId" onChange={HandleChange}>
      <option value=""> Seleccionar Deporte</option>
    {state.category && state.category.map((category) => (
     <MenuItem key={category.id} value={category.id}> {category.name}</MenuItem>))}
      </Select> </>
      <br />
      <div align="right">
        <Button color="primary" onClick={EditarPLan}>Editar</Button>
        <Button onClick={abricerrarMEdit}>Cancelar</Button>
      </div>
    </div>
  );

 
  const bodyEliminar=(
    <div className={styles.modal}>
    <p>Estas seguro que deseas eliminar ?</p>
      <div align="right">
        <Button color="primary" onClick={eliminarplan} >SI</Button>
        <Button onClick={abricerrarMEliminar} >NO</Button>
      </div>
    </div>
  );
  console.log(view);
  console.log(view);
  console.log(view);
  return (
    <>
     <br />
     <p> PLANES </p>
    <br />
  <TableContainer>
<Table>
<TableHead>
<TableRow>
<TableCell>Deporte</TableCell>
<TableCell>Categoria</TableCell>
<TableCell>Dias</TableCell>
<TableCell>Desde</TableCell>
<TableCell>Hasta</TableCell>
<TableCell>Precio</TableCell>
<TableCell>Profesor</TableCell>
<TableCell>Descripcion</TableCell>
<TableCell>Acciones</TableCell>
</TableRow>
</TableHead>

<TableBody>
    {view.map( e=>(
      <TableRow key={e.id}> 
      <TableCell>{e.sport.name}</TableCell>
      <TableCell>{e.category.name}</TableCell>
      <TableCell>{e.day}</TableCell>
      <TableCell>{e.start}</TableCell>
      <TableCell>{e.finish}</TableCell>
      <TableCell>{e.fee}</TableCell>
      <TableCell> {e.user.name}</TableCell>
      <TableCell> {e.description}</TableCell>
      <TableCell>
       <Edit className={styles.iconos} onClick={() => selectAction(e, 'Editar')}/>
        &nbsp;&nbsp;&nbsp;
       <Delete className={styles.iconos}  onClick={() => selectAction(e, 'Eliminar')}  />
    </TableCell>
      </TableRow>
    )
    )}
</TableBody>
</Table>
  </TableContainer>
 <Modal open={deleteModal} onClose={abricerrarMEliminar}>{bodyEliminar}</Modal>
 <Modal open={putModal} onClose={abricerrarMEdit}>{bodyEditar}</Modal> 
    </>
  );

 };
    
