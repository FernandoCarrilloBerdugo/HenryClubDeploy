import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getEvents, getUserSports } from "../../redux/Actions/Action";

export default function Evento(){
    const id = JSON.parse(localStorage.getItem('data')).id
    const evento = useSelector(state => state.evento)
    const [newEvents, setNewEvents] = useState([])
    const [sports, setSports] = useState([])
    const dispatch = useDispatch()
    console.log(evento)

    useEffect(()=>{
        dispatch(getEvents())
        dispatch(getUserSports(id))
    }, [])

    useEffect(() => {
        setNewEvents(evento?.filter((e) =>{
            return sports.includes(e.name)
        }))
    }, [evento])

    function dias(){
        for (let i = 0; i < evento.length; i++) {
            if(evento[i]?.daysOfWeek[0] === 1){
                return "lunes"
            } else if(evento[i]?.daysOfWeek[0] === 2){
                return "martes"
            } else if( evento[i]?.daysOfWeek[0] === 3 ){
                return "miércoles"
            } else if( evento[i]?.daysOfWeek[0] === 4 ){
                return "jueves"
            } else if(evento[i]?.daysOfWeek[0] === 5){
                return "viernes"
            } else if(evento[i]?.daysOfWeek[0] === 6){
                return "sabádo"
            } else if(evento[i]?.daysOfWeek[0] === 6){
                return "domingo"
            }
        }
    }

    return(
        <div className="evento">
            <h1>{evento[0]?.name}</h1>
            <h3>{evento[0]?.title}</h3>
            <p>Desde {evento[0]?.startTime} hasta {evento[0]?.endTime}</p>
            <p>Comienza {evento[0]?.startRecur}</p>
            <p>Finaliza {evento[0]?.endRecur}</p>
            <p>Los días {dias()}</p>
        </div>
    )
}