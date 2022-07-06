import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Modal, Button, TextField} from "@material-ui/core";
import {Edit, Delete} from "@material-ui/icons";
import {
  getTeacher ,
  deleteInstructor,createInstructor,updateIntructor
} from "../../redux/Actions/Action";

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

export default function EquipodeTrabajo() {
  const styles =useStyles()
  const dispatch= useDispatch()
  const members = useSelector((state) => state.members);
  const [insertModal, setinsertModal]= useState (false);
  const [putModal, setputModal]= useState (false);
  const [deleteModal, setdeleteModal]= useState (false);

  const [input,setInput]= useState({	
    name:"",	
    username:"",
    dni:"",
   address:"",
   phone:"",
    email:"",

  })
 

  useEffect(() => {
    dispatch(
      getTeacher()
      );
  }, [dispatch]);

  const HandleChange = (e) => {
     e.preventDefault();
    const{name, value}=e.target;
    setInput({...input,[name]:value})
  };
  console.log(input)


  const CrearInstructor = () => {
    // dispatch(createInstructor())
    abricerrarMInsert()
 };

  const BorrarInstructor = (id) => {
    // dispatch(deleteInstructor(id));
    abricerrarMEliminar()
  };

  const EditarInstructor = (id) => {
    // dispatch(updateIntructor(id))
    abricerrarMEdit()
 };



 const abricerrarMInsert=() =>{
    setinsertModal(!insertModal)
  };
  const abricerrarMEdit=() =>{
    setputModal(!putModal)
  };

  const abricerrarMEliminar=() =>{
    setdeleteModal(!deleteModal)
  };

  const selectAction = (e, caso) => {
    setInput(e);
    (caso === "Editar")?abricerrarMEdit():abricerrarMEliminar()
   };

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>New Instructor</h3>
      <TextField  className={styles.inputMaterial} label="Name" name="name" onChange={HandleChange}  />
      <br />
      <TextField className={styles.inputMaterial} label="Surname" name="username" onChange={HandleChange}  />          
      <br />
      <TextField className={styles.inputMaterial} label="Dni" name="dni" onChange={HandleChange}  />
      <br />
      <TextField className={styles.inputMaterial} label="Address" name="address" onChange={HandleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Phone" name="phone" onChange={HandleChange} />
      <br />
    <  TextField className={
        styles.inputMaterial} label="Email" name="email" onChange={ HandleChange} />
      <br /><br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={CrearInstructor} >Insertar</Button>
        <Button onClick={abricerrarMInsert} >Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>PANEL DE TRABAJO</h3>

      <TextField  className={styles.inputMaterial} label="Name" name="name" onChange={HandleChange} value={input&&input.name} />
      <br />
      <TextField className={styles.inputMaterial} label="Surname" name="username" onChange={HandleChange} value={input&&input.username} />          
      <br />
      <TextField className={styles.inputMaterial} label="Dni" name="dni" onChange={HandleChange} value={input&&input.dni} />
      <br />
      <TextField className={styles.inputMaterial} label="Address" name="address" onChange={HandleChange} value={input&&input.address} />
      <br />
      <TextField className={styles.inputMaterial} label="Phone" name="phone" onChange={HandleChange} value={input&&input.phone} />
      <br />
      <TextField className={styles.inputMaterial} label="Email" name="email" onChange={HandleChange} value={input&&input.email} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={EditarInstructor} >Editar</Button>
        <Button onClick={abricerrarMEdit} >Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
    <p>Estas seguro que deseas eliminar al Profesor?   <b>{input&&input.name}</b>?</p>
      <div align="right">
        <Button color="primary" onClick={BorrarInstructor} >SI</Button>
        <Button onClick={abricerrarMEliminar} >NO</Button>
      </div>
    </div>
  )
  

  return (
    <>
    <br />
    <Button onClick={abricerrarMInsert}> Nuevo Profesor</Button>
    <br />
    <br />
  <TableContainer>
<Table>
<TableHead>

<TableRow>
<TableCell>Name</TableCell>
<TableCell>Surname</TableCell>
<TableCell>Dni </TableCell>
<TableCell>Address </TableCell>
<TableCell>Phone </TableCell>
<TableCell>Email </TableCell>
<TableCell>Acciones</TableCell>
</TableRow>

</TableHead>


<TableBody>
    {members.map( e=>(
      <TableRow key={e.id}> 
      <TableCell>{e.name}</TableCell>
      <TableCell>{e.username}</TableCell>
      <TableCell>{e.id}</TableCell>
      <TableCell>{e.address.street}</TableCell>
      <TableCell>{e.phone}</TableCell>
      <TableCell>{e.website}</TableCell>
      <TableCell>
        <Edit 
        className={styles.iconos} 
       onClick={()=>selectAction(e,"Editar")}
        />
      &nbsp;&nbsp;&nbsp; 
      <Delete className={styles.iconos} onClick={()=> selectAction( e,"Eliminar")}
      />
      </TableCell>
      </TableRow>
    )
    )}

</TableBody>

</Table>

  </TableContainer>
 
<Modal
open={insertModal}
onClose={abricerrarMInsert}
>{bodyInsertar}
</Modal>

<Modal
open={putModal}
onClose={abricerrarMEdit}
>{bodyEditar}
</Modal>

<Modal
open={deleteModal}
onClose={abricerrarMEliminar}
>{bodyEliminar}
</Modal>

    </>
  );

 };
    
