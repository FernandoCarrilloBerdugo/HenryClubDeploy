import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../redux/Actions/Action";
import "./SportCard.css";
import { useState } from "react";

export default function SportCard({sport}) {

	const dispatch = useDispatch();

	const member = useSelector(state => state.memberDetail)

	const [input, setInput] = useState({
		payer_email: localStorage.getItem("data")
			? JSON.parse(localStorage.getItem("data")).email
			: "",
		items: [
			{
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
				unit_price: 0,
			},
		],
	});

	useEffect(() => {
		input.items[0].id &&
			dispatch(payment(input)).then((url) => window.open(url, "_blank")).then(setInput({
        payer_email: localStorage.getItem("data")
          ? JSON.parse(localStorage.getItem("data")).email
          : "",
        items: [
          {
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
            unit_price: 0,
          },
        ],
      }));
	}, [input]);

	const handleClick = (e) => {
		e.preventDefault();
		setInput({
			...input,
			items: [
				{
					id: JSON.parse(localStorage.getItem("data")).id,
					category_id: sport.id,
					title: sport.description,
					description: sport.description,
					quantity: 1,
					unit_price: sport.fee,
				},
			],
		});
	};

	return (
		<div className="card">
			{
				<ContenedorModal>
					<div>
						<h2>Categoria: {sport.category.name}</h2>
						<p>Descripción: {sport.description} </p>
						<p>
							Horarios: De {sport.start} a {sport.finish}
						</p>
						<p>Comienza: {sport.day}</p>
						<p>Profesor: {sport.user.name}</p>
						<p>${sport.fee}</p>
					</div>
					{
						//Eres miembro? (estas inscrito ? no renderices boton : renderiza boton) : Registrate para poder inscribirte
					localStorage.getItem('token') 	
					? 	(	!member.inscriptions.filter(activity => activity.CategorySportId === sport.id).length >= 1 		 
					?	<button onClick={handleClick}>
					Inscribete
					</button>		 
					:	<p>Ya estás inscrito a esta actividad</p>			) 		
					: <p>Registrate para poder inscribirte</p>


				}
				</ContenedorModal>
			}
		</div>
	);
}

const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px
    align-items: center,
`;
