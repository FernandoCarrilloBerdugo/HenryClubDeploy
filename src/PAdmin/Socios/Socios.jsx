
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableContainer, TableCell, TableBody, TableRow, Modal, Button, TextField } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import TableHeader from "./tableheader";
import TablePagination from '@material-ui/core/TablePagination';
import {
  getMembers,
  deleteMember, createMember, updateMember, getRoles
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// const sortedRowInformation = (rowArray, comparator) =>{
//   const stabilizedRowArray = rowArray.map((e,index)=>[e,index])
//   stabilizedRowArray.sort((a,b)=>{ 
//     const order = comparator(a[0], b[0])
//   if(order !== 0) return order
//   return a[1] - b[1]
//   })
//   return stabilizedRowArray.map(e => e[0]) 
//} 
const sortedRowInformation = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




export default function Socios() {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [valueToOrderBy, setValueToOrderBy] = useState("asc");
  const [orderDirection, setOrderDirection] = useState("name");
  const members = useSelector((state) => state.members);
  const roles = useSelector((state) => state.roles)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [insertModal, setinsertModal] = useState(false);
  const [putModal, setputModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("")
  const [editId, setEditId] = useState("")

  const [input, setInput] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    dni: "",
    edad: "",
    password: "123456",
    roleId: ""
  })

  const handleSelect = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(getMembers());
    dispatch(getRoles())
  }, [dispatch]);

  const HandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  };

  const CrearMember = (e) => {
    e.preventDefault()
    dispatch(createMember(input)).then(res =>
      dispatch(getMembers())
    ).then(res =>
      alert("Socio Creado!!")
    )

    abricerrarMInsert()
  };
  const BorrarMember = (e) => {
    dispatch(deleteMember(deleteId)).then(res =>
      dispatch(getMembers())
    ).then(res =>
      abricerrarMEliminar()
    )
  };
  const EditarMember = (id) => {
    console.log(input)
    dispatch(updateMember(editId, input)).then(res =>
      dispatch(getMembers())
    )
      .then(res => {
        abricerrarMEdit()
        alert("usuario editado")
      }
      )
  };
  const abricerrarMInsert = () => {
    setinsertModal(!insertModal)
  };
  const abricerrarMEdit = () => {
    setputModal(!putModal)
  };

  const abricerrarMEliminar = () => {
    setdeleteModal(!deleteModal)
  };

  const selectAction = (e, caso) => {
    setDeleteId(e.id)
    setEditId(e.id)
    setInput(e);
    (caso === "Editar") ? abricerrarMEdit() : abricerrarMEliminar()
  };
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Nuevo Socio</h3>
      <TextField className={styles.inputMaterial} label="Name" name="name" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Surname" name="surname" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Address" name="address" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Phone" name="phone" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Email" name="email" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="UserName" name="username" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Dni" name="dni" onChange={HandleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Edad" name="edad" onChange={HandleChange} />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={CrearMember} >Insertar</Button>
        <Button onClick={abricerrarMInsert} >Cancelar</Button>
      </div>
    </div>
  )
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Socio</h3>
      <TextField className={styles.inputMaterial} label="Name" name="name" onChange={HandleChange} value={input && input.name} />
      <br />
      <TextField className={styles.inputMaterial} label="Surname" name="surname" onChange={HandleChange} value={input && input.surname} />
      <br />
      <TextField className={styles.inputMaterial} label="Address" name="address" onChange={HandleChange} value={input && input.address} />
      <br />
      <TextField className={styles.inputMaterial} label="Phone" name="phone" onChange={HandleChange} value={input && input.phone} />
      <br />
      <TextField className={styles.inputMaterial} label="Email" name="email" onChange={HandleChange} value={input && input.email} />
      <br />
      <TextField className={styles.inputMaterial} label="UserName" name="username" onChange={HandleChange} value={input && input.username} />
      <br />
      <TextField className={styles.inputMaterial} label="Dni" name="dni" onChange={HandleChange} value={input && input.dni} />
      <br />
      <br />
      <label>Rol</label>
      <select className={styles.select} onChange={handleSelect} name="roleId">
        <option value=""> Rol </option>
        {roles &&
          roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
      </select>
      <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={EditarMember} >Editar</Button>
        <Button onClick={abricerrarMEdit} >Cancelar</Button>
      </div>
    </div>
  )
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estas seguro que deseas eliminar al socio <b>{input && input.name}</b>?</p>
      <div align="right">
        <Button color="primary" onClick={BorrarMember} >SI</Button>
        <Button onClick={abricerrarMEliminar} >NO</Button>
      </div>
    </div>
  )

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? "desc" : "asc")
  }

  return (
    <>
      <br />
      <Button onClick={abricerrarMInsert}> Nuevo Socio</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHeader
            valueToOrdeBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />

          <TableBody>
            {sortedRowInformation(members, getComparator(orderDirection, valueToOrderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.membershipNumber}</TableCell>
                  <TableCell>{e.name} </TableCell>
                  <TableCell>{e.surname}</TableCell>
                  <TableCell>{e.username}</TableCell>
                  <TableCell>{e.address}</TableCell>
                  <TableCell>{e.phone}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell>{e.dni}</TableCell>
                  <TableCell>
                    <Edit
                      className={styles.iconos}
                      onClick={() => selectAction(e, "Editar")}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Delete className={styles.iconos} onClick={() => selectAction(e, "Eliminar")}
                    />
                  </TableCell>
                </TableRow>
              )
              )

            }
          </TableBody>

        </Table>

      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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

