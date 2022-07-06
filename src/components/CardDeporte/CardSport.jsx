import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategorySport } from "../../redux/Actions/Action";

export default function CardSport() {
    const dispatch = useDispatch()
    const view = useSelector(state => state.categorySport)
    console.log(view)

    useEffect(() => {
        dispatch(getCategorySport())
    }, [])
     

    return(
        <div className="deporte">
                {
                    view.map((e)=>(
                        <ContenedorModal>
                        <div key={e.id}>
                            <h2>{e.sport.name}: {e.category.name}</h2>
                            <p>Descripción: </p>
                            <p>
                                {e.description}
                            </p>
                            <p>Horarios:</p>
                            <p>{e.start} a {e.finish}</p>
                            <p>Comienza {e.day}</p>
                            <h3>${e.fee}</h3>
                        </div>
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