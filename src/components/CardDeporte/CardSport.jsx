import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategorySport } from "../../redux/Actions/Action";
import './Sport.css'
import { useState } from "react";

export default function CardSport() {
    const dispatch = useDispatch()
    const view = useSelector(state => state.categorySport)
    const [input, setInput] = useState({})
    console.log(view)

    useEffect(() => {
        dispatch(getCategorySport())
    }, [])
    
    const handleClick = (e)=> {}

    return(
        <div className="cardSport">
                {
                    view.map((e)=>(
                        <ContenedorModal>
                            <div key={e.id}>
                                <h2>Categoria: {e.category.name}</h2>
                                <p>Descripción: {e.description} </p>
                                <p>Horarios: De {e.start} a {e.finish}</p>
                                <p>Comienza: {e.day}</p>
                                <p>Profesor: {e.user.name}</p>
                                <p>${e.fee}</p>
                            </div>
                            <button onClick={handleClick} value={e}>Inscribete</button>
                        </ContenedorModal>
                    ))
                }
        </div>
    )
}

const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px
    align-items: center,
`