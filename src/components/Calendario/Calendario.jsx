import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendario.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSport, postEvento, getEvents, detailEvento, clearPage } from '../../redux/Actions/Action';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './Modal';

export default function MyCalendar() {
  const sport = useSelector(state => state.sport);
  const event = useSelector(state => state.evento)
  const [myEvents, setMyEvents] = useState([]);
  const dispatch = useDispatch();
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    startRecur: '',
    endRecur: '',
    calendarId: 0,
    daysOfWeek: [],
  });
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(false)
  // const {id} = useParams()
  // console.log(id)
  // const detailEvent = useSelector(state => state.eventDetail)
  // console.log(detailEvent)

  // useEffect(() => {
  //   dispatch(detailEvento(id));
  //   return () => {
  //     dispatch(clearPage())
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getSport());
    dispatch(getEvents())
  }, [dispatch]);

  useEffect(() => {
    setMyEvents(event)
  }, [event])


  const handleChangeInput = e => {
    if (e.target.name === 'daysOfWeek') {
      setNewEvent({
        ...newEvent,
        [e.target.name]: [...newEvent.daysOfWeek, Number(e.target.value)],
      });
    } else {
      setNewEvent({
        ...newEvent,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    setMyEvents([...myEvents, newEvent]);
    alert('Evento Creado');
    console.log(newEvent)
    dispatch(postEvento(newEvent))
    setNewEvent({
      title: '',
      startTime: '',
      endTime: '',
      startRecur: '',
      endRecur: '',
      calendarId: 0,
      daysOfWeek: [],
    });
  };

  const handleSelectSport = e => {
    setNewEvent({
      ...newEvent,
      calendarId: e.target.value,
    });
  };

  

  return (
    <div className="calendarioContainer">
      <div>
        <ContenedorBotones>
          <Link to={'/admin'}>
            <button>
              <span>Regresar</span>
            </button>
          </Link>
          {/* <Boton onClick={() => handleChangeEvent(!setModal)}>
            Agenda
          </Boton> */}
        </ContenedorBotones>
      </div>
      <Modal
        estado={modal}
        cambiarEstado={setModal}
      >
        <form className="formCalendario">
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={e => handleChangeInput(e)}
            placeholder="Nombre del evento"
          />
          <label>Desde las</label>
          <input
            type={'time'}
            name="startTime"
            value={newEvent.startTime}
            onChange={e => handleChangeInput(e)}
          />
          <label>Hasta las</label>
          <input
            type={'time'}
            name="endTime"
            value={newEvent.endTime}
            onChange={e => handleChangeInput(e)}
          />
          <label>Duración:</label>
          <input
            type={'date'}
            name="startRecur"
            value={newEvent.startRecur}
            onChange={e => handleChangeInput(e)}
          />
          <input
            type={'date'}
            name="endRecur"
            value={newEvent.endRecur}
            onChange={e => handleChangeInput(e)}
          />
          <select
            name="calendarId"
            id="calendarId"
            onChange={e => handleSelectSport(e)}
          >
            <option value="">Elegir Actividad</option>
            {sport.lenght !== 0
              ? sport?.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
          <select
            name="daysOfWeek"
            id="daysOfWeek"
            onChange={e => handleChangeInput(e)}
          >
            <option value="">Días de la semana</option>
            {[
              { Label: 'Lunes', value: 1 },
              { Label: 'Martes', value: 2 },
              { Label: 'Miercoles', value: 3 },
              { Label: 'Jueves', value: 4 },
              { Label: 'Viernes', value: 5 },
              { Label: 'Sábado', value: 6 },
              { Label: 'Domingo', value: 7 },
            ].map(day => (
              <option key={day.value} value={day.value}>
                {day.Label}
              </option>
            ))}
          </select>
          <div className="diasSemanales">
            {newEvent.daysOfWeek.length > 0 &&
              newEvent.daysOfWeek?.map(e =>
                e === 1 ? (
                  <div key={e}>Lunes</div>
                ) : e === 2 ? (
                  <div>Martes</div>
                ) : e === 3 ? (
                  <div>Miercoles</div>
                ) : e === 4 ? (
                  <div>Jueves</div>
                ) : e === 5 ? (
                  <div>Viernes</div>
                ) : e === 6 ? (
                  <div>Sábados</div>
                ) : e === 7 ? (
                  <div>Domingo</div>
                ) : (
                  <div>Días de la semana</div>
                )
              )}
          </div>
        </form>
        <button type="submit" onClick={e =>handleSubmit(e)}>
          Agregar Evento
        </button>
      </Modal>
      {/* <Modal
        estado={detail}
        cambiarEstado={setDetail}
      >
        <h3>{detailEvent.title}</h3>
      </Modal> */}
      <div className="calendario">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={'es'}
          headerToolbar={{
            left: 'prev, next, today',
            center: 'title',
            right: 'dayGridMonth, timeGridWeek, listWeek',
          }}
          dateClick={function(info){
            setModal(!modal)
          }}
          events={myEvents}
          eventClick={function(info){
            alert(info.event.title + ':' +
                  ' empieza ' + info.event.startStr.replace('T', ' ').slice(0, -6)
                  + ' hasta ' + info.event.endStr.replace('T', ' ').slice(0, -6)
                  )
            // setDetail(!detail)
          }}
        />
      </div>
    </div>
  );
}

const ContenedorBotones = styled.div`
  padding: 10px;
  display: flex;
  flew-wrap: wrap;
  justify-content: center;
  gap: 20px
`

const Boton = styled.button`
  display: block,
  padding: 10px 30px;
  color: #fff
`
