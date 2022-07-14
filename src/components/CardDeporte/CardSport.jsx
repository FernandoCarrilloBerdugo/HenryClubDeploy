import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategorySport, payment } from "../../redux/Actions/Action";
import './Sport.css'
import { useState } from "react";

export default function CardSport() {

    const dispatch = useDispatch()

    const history = useHistory()

    const view = useSelector(state => state.categorySport)

    const [input, setInput] = useState({
        payer_email: "test_user_35125907@testuser.com",
        items: [{
            //id del usuario loggeado
            id: "",
            //id de la actividad
            category_id: "",
            //titulo de la actividad
            title: "",
            //descripción de la actividad
            description: "",
            //Cantidad a comprar (siempre 1 por ser inscripción)
            quantity: 1,
            //Precio de la inscripción
            unit_price: 0
        }]
    })

    useEffect(() => {
        dispatch(getCategorySport())
    }, [])

    useEffect(() => {
        input.items[0].id && dispatch(payment(input)).then(url => window.open(url, '_blank'))
    }, [input])
    
    const handleClick = (e) => {
        e.preventDefault()
        const item = view[e.target.value]
        setInput({
            ...input,
            items:[{
                id:JSON.parse(localStorage.getItem('data')).id,
                category_id: item.id,
                title: item.description,
                description: item.description,
                quantity: 1,
                unit_price: item.fee
            }]
        })
        // .then(r => dispatch(payment(input)))
        // .then(url => window.open(url, '_blank'))
    }

    return (
        <div className="cardSport">
            {
                view.map((activity, i) => (
                    <ContenedorModal key={i}>
                        <div>
                            <h2>Categoria: {activity.category.name}</h2>
                            <p>Descripción: {activity.description} </p>
                            <p>Horarios: De {activity.start} a {activity.finish}</p>
                            <p>Comienza: {activity.day}</p>
                            <p>Profesor: {activity.user.name}</p>
                            <p>${activity.fee}</p>
                        </div>
                        <button onClick={handleClick} value={i}>Inscribete</button>
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