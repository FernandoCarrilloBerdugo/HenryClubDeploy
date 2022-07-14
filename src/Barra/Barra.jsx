import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterCategory,
  defaultGetCategorySport,
  getCategory
} from '../redux/Actions/Action';
import S from '../Barra/Barra.module.css';

export default function Barra() {
  const dispatch = useDispatch();
  // const activities = useSelector(state => state.activities);

  const category = useSelector(state => state.category);

  // const [orden, setOrden] = useState('');

  function handleOrderCategory(e) {
    e.preventDefault();
    console.log(category);
    dispatch(filterCategory(e.target.value));
    // setOrden(`${e.target.value}`);
  }

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className={S.contenedor}>
      {/* <select defaultValue="default">
        <option value="default">Galeria</option>
        <option value="foto">Fotos</option>
        <option value="video">Videos</option>
      </select>
      <select defaultValue="default">
        <option value="default">Actividades</option>
        {Activities.map(e => {
          return (
            <option value={e.name} key={e.name}>
              {e.name}
            </option>
          );
        })}
      </select>
      onChange="window.location.href=this.value" PONERLO DENTRO DEL SELECT PARA EL ONCHANGE
      <select defaultValue="default">
        <option value="default">Club</option>
        <option value="historia">Historia</option>
        <option value="Comunidad">Comunidad</option>
        <option value="nosotros">Nosotros</option>
      </select> */}

      <div className={S.filtroCategoria}>
        <label htmlFor="">Selecciona Filtro de categoria:</label>
        <select
          onChange={e => {
            handleOrderCategory(e);
          }}
        >
          <option value="All">Categorias</option>
          {category.map(e => {
            return (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            );
          })}

          {/* <div className={style.content}> Buscar por Genero
      <select name='select' onChange={(e)=>handleGender(e)} defaultValue="default">
      <option value='default' disabled='disabled'>Géneros</option>
        <option value='All'>Todos</option>
        {
          allGenres.map((e)=>(
            <option key={ e.name } value={ e.name }>
              {e.name}
            </option>
          ))}
      </select>
    </div> */}
        </select>
      </div>
    </div>
  );
}