import React from 'react';
import { useSelector } from 'react-redux';
import S from '../Barra/Barra.module.css';

export default function Barra() {
  const Activities = useSelector(state => state.activities);

  return (
    <div className={S.contenedor}>
      <select defaultValue="default">
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

      {/* onChange="window.location.href=this.value" PONERLO DENTRO DEL SELECT PARA EL ONCHANGE*/}
      <select defaultValue="default">
        <option value="default">Club</option>
        <option value="historia">Historia</option>
        <option value="planes">Planes</option>
        <option value="Comunidad">Comunidad</option>
        <option value="nosotros">Nosotros</option>
      </select>
    </div>
  );
}
