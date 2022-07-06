import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
// import{NavLink} from "react-router-dom";
import {getNews,deleteNews,detailNews } from "../../redux/Actions/Action";

export default function Socios () {
  const dispatch= useDispatch()
  const members = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNews(id));
  };

 
console.log(members)

  return (
    <>
   <table>
				<tr>
					<th>NAME</th><th>SURNAME</th><th>DNI</th>
				</tr>
         {members?members.map(e=>{
          return	(
          <tr key={e.dni}>	
            <td>{e.name}</td>
            <td>{e.surname}</td>
            <td>{e.dni}</td>
            <td><button onChange={handleDelete}>eliminar</button>
            <button onChange={()=>detailNews()}>ver detalle</button>
            {/* <NavLink to="/user/:id">  <button>ver detalle</button></NavLink> */}
           </td>
             </tr>
            )	
       }):0} 
		</table>
    </>
  );

 };
    


