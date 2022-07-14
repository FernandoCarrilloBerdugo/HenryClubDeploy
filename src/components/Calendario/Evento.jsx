import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getEvents, getInscription } from "../../redux/Actions/Action";
// import { getUserSports } from "../../redux/Actions/Action";

export default function Evento(){
    // const id = JSON.parse(localStorage.getItem('data')).id
    const evento = useSelector(state => state.evento)
    const sports = useSelector(state => state.inscriptions)
    const [newEvents, setNewEvents] = useState([])
    const dispatch = useDispatch()
    console.log(newEvents)

    useEffect(()=>{
        dispatch(getEvents())
        dispatch(getInscription())
    }, [])

    useEffect(() => {
        const nuevosEventos = evento?.filter((e) =>{
            return sports?.CategorySport?.sport?.name
        })
        setNewEvents(nuevosEventos)
    }, [evento, sports])

    function dias(){
        for (let i = 0; i < newEvents.length; i++) {
            if(newEvents[i]?.daysOfWeek[0] === 1){
                return "lunes"
            } else if(newEvents[i]?.daysOfWeek[0] === 2){
                return "martes"
            } else if( newEvents[i]?.daysOfWeek[0] === 3 ){
                return "miércoles"
            } else if( newEvents[i]?.daysOfWeek[0] === 4 ){
                return "jueves"
            } else if(newEvents[i]?.daysOfWeek[0] === 5){
                return "viernes"
            } else if(newEvents[i]?.daysOfWeek[0] === 6){
                return "sabádo"
            } else if(newEvents[i]?.daysOfWeek[0] === 7){
                return "domingo"
            }
        }
    }

    return(
        <div className="evento">
            <h1>Mi deporte: {newEvents[0]?.name}</h1>
            <h1>Mis actividades:</h1>
            <h3>{newEvents[0]?.title}</h3>
            <p>Desde {newEvents[0]?.startTime} hasta {newEvents[0]?.endTime}</p>
            <p>Comienza {newEvents[0]?.startRecur}</p>
            <p>Finaliza {newEvents[0]?.endRecur}</p>
            <p>Los días {dias()}</p>
        </div>
    )
}