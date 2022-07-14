
import { useSelector, useDispatch } from "react-redux";
import { useEffect,} from "react";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow, Button} from "@material-ui/core";
import {getNewLetters} from "../../redux/Actions/Action";
import { CSVLink} from "react-csv";



export default function Post () {
  const dispatch= useDispatch()
  const newletters2 = useSelector((state) => state.newletters);
 const newletters= newletters2.map(e=>({email:e.email}))

  useEffect(() => {
    dispatch(getNewLetters());
  }, [dispatch]);

  return (
    <>
     <br />
     <p> NewLetters</p>
    <br />
  <TableContainer >
<Table>
<TableHead>
<TableRow>
<TableCell>Emails</TableCell>
</TableRow>
</TableHead>
<TableBody >
    {newletters.map( e=>(
      <TableRow key={e.id}> 
      <TableCell>{e.email}</TableCell>
      </TableRow> ) )}
</TableBody>
</Table>
  </TableContainer>
  <br />
     <Button >   <CSVLink data={newletters}> descargar en excel</CSVLink></Button>
      <br />
    </>
  );

 };
    
