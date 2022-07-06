import React from 'react'
import { Route, NavLink} from 'react-router-dom';
import Home from '../PAdmin/Home2/Home2';
import News from '../PAdmin/News2/News2';
import Header from "../PAdmin/headerAdmin/haaderAdmin";
import s from './User.module.css';
import UserProfile from './UserProfile/UserProfile';
import PLanes from "./Tusplanes/tusplanes";
import Actividades from "./Actividades/Actividades"


export default function User() {
  return (
    <> 
  <div className={s.header}>
<Header/>
  </div>
  <div className={s.container}>
   <div className={s.barralateral}>
     <ul>
      <li>
      <NavLink to="/user/news">News</NavLink>
 
      </li>
      <li> 
      <NavLink to="/user/home">Home</NavLink>
      </li>
      <li> 
      <NavLink to="/user/home">Your Calendar</NavLink>
      </li>
      <li> 
      <NavLink to="/user/profile">modify your data</NavLink>
      </li>
      <li> 
      <NavLink to="/user/actividades">tus actividades</NavLink>
      </li>
      <li> 
      <NavLink to="/user/planes">PLanes</NavLink>
      </li>
     </ul>
    </div>
    <div className={s.mostrar}>
     <Route path="/user/home" component={Home} />
     <Route path="/user/news" component={News} />
     <Route path="/user/profile" component={UserProfile} />
     <Route path="/user/planes" component={PLanes} />
     <Route path="/user/actividades" component={Actividades} />
    
    </div>
    </div>
    </>
  )
}
