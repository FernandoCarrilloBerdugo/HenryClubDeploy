import React from 'react'
import { TableSortLabel,TableHead,TableCell,TableRow} from "@material-ui/core";

export default function TableHeader(props) {

  const{valueToOrderBy,orderDirection,handleRequestSort} = props;

 const createSortHandler = (property) =>(event) =>{
  handleRequestSort(event, property);
 };

  return (

 <TableHead>

<TableRow>

  <TableCell key="membershipNumber">
  <TableSortLabel 
active={valueToOrderBy==="membershipNumber"} 
direction={valueToOrderBy==="membershipNumber"?orderDirection:"asc"}
onClick={createSortHandler("membershipNumber")}
> N° Socio</TableSortLabel></TableCell>

<TableCell key="name">
  <TableSortLabel
  active={valueToOrderBy==="name"} 
  direction={valueToOrderBy==="name"?orderDirection:"asc"}
  onClick={createSortHandler("name")}
  > 
   Name 
 </TableSortLabel>
</TableCell>


<TableCell key="surname">
  <TableSortLabel
  active={valueToOrderBy==="surname"} 
  direction={valueToOrderBy==="surname"?orderDirection:"asc"}
  onClick={createSortHandler("surname")}
  > 
  Surname 
 </TableSortLabel>
</TableCell>

  <TableCell key="username">
  <TableSortLabel
  active={valueToOrderBy==="username"} 
  direction={valueToOrderBy==="username"?orderDirection:"asc"}
  onClick={createSortHandler("username")}
  > 
username
 </TableSortLabel>
</TableCell>


  <TableCell key="address">
  <TableSortLabel
  active={valueToOrderBy==="address"} 
  direction={valueToOrderBy==="address"?orderDirection:"asc"}
  onClick={createSortHandler("address")}> 
 address
 </TableSortLabel>
</TableCell>

  <TableCell key="phone">
  <TableSortLabel
  active={valueToOrderBy==="phone"} 
  direction={valueToOrderBy==="phone"?orderDirection:"asc"}
  onClick={createSortHandler("phone")}> 
phone
 </TableSortLabel>
</TableCell>

<TableCell key="email">
  <TableSortLabel
  active={valueToOrderBy==="email"} 
  direction={valueToOrderBy==="email"?orderDirection:"asc"}
  onClick={createSortHandler("email")}> 
email
 </TableSortLabel>
</TableCell>

<TableCell key="role">
  <TableSortLabel
  active={valueToOrderBy==="role"} 
  direction={valueToOrderBy==="role"?orderDirection:"asc"}
  onClick={createSortHandler("role")}> 
Rol
 </TableSortLabel>
</TableCell>


<TableCell key="dni">
  <TableSortLabel
  active={valueToOrderBy==="dni"} 
  direction={valueToOrderBy==="dni"?orderDirection:"asc"}
  onClick={createSortHandler("dni")}> 
Dni
 </TableSortLabel>
</TableCell>


<TableCell>
<TableSortLabel> 
  Acciones
  </TableSortLabel>
  </TableCell>




</TableRow>

</TableHead>

  )
}

