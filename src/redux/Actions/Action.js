import axios from "axios";
import jwt_decode from "jwt-decode";
import { icons } from "react-icons";
import swal from "sweetalert";

import {

  ALL_MEMBERS,
  ALL_IMAGES,
  ALL_NEWS,
  DETAIL_NEWS,
  DETAIL_MEMBER,
  DETAIL_TEACHER,
  ALL_COMMENTS,
  ALL_CONTACTS,
  UPDATE_NEWS,
  UPDATE_COMMENT,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  DELETE_NEWS,
  DELETE_COMMENT,
  DELETE_CONTACT,
  SEARCH_SEARCH,
  CLEAR_PAGE,
  CLEAR_COMMENTS,
  DETAIL_EVENTO,
  ALL_EVENTO,
  GET_SPORT,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  GET_TEACHER,
  ALL_PAYS,
  DELETE_TEACHER,
  DELETE_CATEGORY,
  ALL_ROLES,
  ALL_INSCRIPTIONS,
  DETAIL_CATEGORY_SPORT,
  GET_CATEGORY_SPORT,
  JWT,
  CLEAR_MEMBER_DETAIL,
  GET_USER_SPORTS,
  PAYMENT,
  DEFAULT_GET_CATEGORY_SPORT,

  GET_NEW_LETTERS,

  ALL_ALBUMS,

} from './DataTypes';

const url = process.env.API_URL

//Get

export function getMembers() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get(`${url}/user`);
			return dispatch({ type: ALL_MEMBERS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getContacts() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/contact");
			return dispatch({ type: ALL_CONTACTS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getGallery() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/photo");
			return dispatch({ type: ALL_IMAGES, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getAlbum() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/album");
			return dispatch({ type: ALL_ALBUMS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getNews() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/news");
			return dispatch({ type: ALL_NEWS, payload: data });
		} catch (error) {
			error = {
				id: "No encontrado",
				title: "No se encontro lo que buscaba...",
				subtitle: "No se encontro lo que buscaba...",
				image: "https://www.seekpng.com/png/detail/212-2123432_404-error-error-404-in-png.png"
			}
		}
	};
}


export function getRoles() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/role");
			return dispatch({ type: ALL_ROLES, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getInscription() {

  return async dispatch => {
    try {
      let { data } = await axios.get('https://backhenryclub.herokuapp.com/inscription');
      return dispatch({ type: ALL_INSCRIPTIONS, payload: data[1] });
    } catch (error) {
      alert(error.response.data);
    }
  };

}

export function getComments(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.get(`https://backhenryclub.herokuapp.com/comment/${id}`);
			if (data) return dispatch({ type: ALL_COMMENTS, payload: data });
			//Necesitamos que si no encuentra ningun comentario que el back regrese un array vacío
			// else return dispatch({type:ALL_COMMENTS, payload:[]})
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getEvents() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/calendar");
			return dispatch({
				type: ALL_EVENTO,
				payload: data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getSport() {
	return async function (dispatch) {
		const { data } = await axios.get("https://backhenryclub.herokuapp.com/sport");
		return dispatch({
			type: GET_SPORT,
			payload: data,
		});
	};
}

// Ruta para traerse todos los deportes relacionados a mi usuario
export function getUserSports(userId) {

  return async function (dispatch) {
    const { data } = await axios.get(`https://backhenryclub.herokuapp.com/sport/${userId}`);
    return dispatch({
      type: GET_USER_SPORTS,
      payload: data,
    });
  };

}

export function createSport(input) {
	return async function () {
		try {
			const { data } = await axios.post(
				`https://backhenryclub.herokuapp.com/sport/`,
				input
			);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function getTeacher() {
	return async function (dispatch) {
		const { data } = await axios.get("https://backhenryclub.herokuapp.com/teacher");
		return dispatch({
			type: GET_TEACHER,
			payload: data,
		});
	};
}

export function getCategory() {
	return async function (dispatch) {
		const { data } = await axios.get("https://backhenryclub.herokuapp.com/category");
		return dispatch({
			type: GET_CATEGORY,
			payload: data,
		});
	};
}

export function getCategorySport() {

  return async function (dispatch) {
    const { data } = await axios.get('https://backhenryclub.herokuapp.com/categorysport');
    return dispatch({
      type: GET_CATEGORY_SPORT,
      payload: data,
    });
  };
}

export function defaultGetCategorySport() {
  return async function (dispatch) {
    const { data } = await axios.get('https://backhenryclub.herokuapp.com/categorysport');
    return dispatch({
      type: DEFAULT_GET_CATEGORY_SPORT,
      payload: data,
    });
  };

}

export function createCategory(input) {
	return async function () {
		try {
			const { data } = await axios.post(
				`https://backhenryclub.herokuapp.com/category`,
				input
			);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function updateCategory(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(
				`https://backhenryclub.herokuapp.com/category/${id}`,
				input
			);
			return dispatch({ type: UPDATE_CATEGORY, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function updateSport(input) {
	return async () => {
		try{
			console.log(input)
			let {data} = await axios.put(`https://backhenryclub.herokuapp.com/sport`, input)
			return data
		}
		catch(error){
			console.log(error)
			alert(error.response.data);
		}
	}
}

export function deleteSport(id) {
	return async () => {
		try {
			let {data} = await axios.delete(`https://backhenryclub.herokuapp.com/sport/${id}`)
			return data
		} catch (error) {
			console.log(error)
			alert(error.response.data)
		}
	}
}

export function deleteCategory(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/category/${id}`);
			return data
		} catch (error) {
			console.log(error)
		}
	};
}

//
export function loginMember(input) {
	return async function () {
		try {
			const { data } = await axios.post("https://backhenryclub.herokuapp.com/user", input);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

//Detail

export function detailMember(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.get(`https://backhenryclub.herokuapp.com/user/${id}`);
			return dispatch({ type: DETAIL_MEMBER, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function detailNews(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`https://backhenryclub.herokuapp.com/news/${id}`);
			dispatch({
				type: DETAIL_NEWS,
				payload: data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function detailEvento(id) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`https://backhenryclub.herokuapp.com/calendar/${id}`);
			dispatch({
				type: DETAIL_EVENTO,
				payload: json.data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function detailCategorySport(id) {

  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `https://backhenryclub.herokuapp.com/categorysport/${id}`
      );
      dispatch({
        type: DETAIL_CATEGORY_SPORT,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };

}

export function detailTeacher(id) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`https://backhenryclub.herokuapp.com/teacher/${id}`);
			dispatch({
				type: DETAIL_TEACHER,
				payload: json.data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

//Post

export function createNews(userId, input) {
	return async function () {
		try {
			const { data } = await axios.post(
				`https://backhenryclub.herokuapp.com/news/crear/${userId}`,
				input
			);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function postAlbum(payload){
	return async function(){
	  const json = await axios.post('https://backhenryclub.herokuapp.com/album', payload);
	  return json
	}
  }
  
  export async function postImages(payload){
	// return async function() {
		try{
	  return await axios.post(`https://backhenryclub.herokuapp.com/photo/${payload.album}`, payload).then(
			swal({
				title: "Foto agregada.",
				icon: "success",
				button: "Ok."
		})
		)
	 
}catch(error){
console.log(error)
}
	
  }
  
  

export function createInscription(userId, input) {
	return async function () {
		try {
			const { data } = await axios.post(
				`https://backhenryclub.herokuapp.com/inscription/${userId}`,
				input
			);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function createActivity(input) {

  return async function () {
    try {
      const { data } = await axios.post(
        `https://backhenryclub.herokuapp.com/categorysport/`,
        input
      );
      swal({
        title: "Actividad creada",
        button: "Ok."
      })
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };

}

export function createMember(input) {
	return async () => {
		try {
			if (input.age >= 18) {
				input.isOlder = true;
			} else {
				input.isOlder = false;
			}

			let { data } = await axios.post(`https://backhenryclub.herokuapp.com/user`, input);
			return data;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function createComment(newsId, userId, input) {
	return async (dispatch) => {
		try {
			console.log(newsId);
			console.log(userId);
			console.log(input);
			await axios.post(
				`https://backhenryclub.herokuapp.com/comment/comentar/${newsId}/${userId}`,
				input
			);

			// let {data} = await axios.get("https://backhenryclub.herokuapp.com/user")

			// return dispatch({type:ALL_COMMENTS,payload:data});
			return;
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function createContact(input) {
	return async () => {
		try {
			let { data } = await axios.post("https://backhenryclub.herokuapp.com/contact", input);
			return data;
		} catch (error) {
console.log(error)
		}
	};
}

export function postEvento(payload) {
	return async function () {
		const json = await axios.post("https://backhenryclub.herokuapp.com/calendar", payload);
		return json;
	};
}

//PUT
export function updateNews(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(`https://backhenryclub.herokuapp.com/news/${id}`, input);
			return dispatch({ type: UPDATE_NEWS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function updateComment(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(
				`https://backhenryclub.herokuapp.com/comment/${id}`,
				input
			);
			return dispatch({ type: UPDATE_COMMENT, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function updateMember(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(`https://backhenryclub.herokuapp.com/user/${id}`, input);
			return dispatch({ type: UPDATE_MEMBER, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

//DELETE
export function deleteNews(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/news/${id}`);
			return dispatch({ type: DELETE_NEWS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function deleteTeacher(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/news/${id}`);
			return dispatch({ type: DELETE_TEACHER, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function deleteComment(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/comment/${id}`);
			return dispatch({ type: DELETE_COMMENT, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function deleteMember(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/user/${id}`);
			return dispatch({ type: DELETE_MEMBER, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}
export function deleteContact(id) {
	return async (dispatch) => {
		try {
			let { data } = await axios.delete(`https://backhenryclub.herokuapp.com/contact/${id}`);
			return dispatch({ type: DELETE_CONTACT, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

//Perfil
export function GetProfile(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				"https://backhenryclub.herokuapp.com/profile/:id"
			); /*"https://backhenryclub.herokuapp.com/profile/" + id lo puse asi para probar como se ve, para que funcione poner el codigo comentado*/
			return dispatch({
				type: "GET_PROFILE",
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Buscar
export function search(name) {
	return {
		type: SEARCH_SEARCH,
		payload: name,
	};
}

//Pago
export function getPay() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get("https://backhenryclub.herokuapp.com/pay");
			return dispatch({ type: ALL_PAYS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}

export function payment(input) {

  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `https://mp-back-last.herokuapp.com/payment`,
        input
      );
      console.log(data.url);
      return data.url;
    } catch (error) {
      alert(
        'No se pudo procesar la solicitud, por favor espere o si el error persiste, pongase en contacto con el administrador'
      );
    }
  };

}

//Filtrar noticias

export function filterNews(title) {
	return async (dispatch) => {
		try{
		let { data } = await axios.get(`https://backhenryclub.herokuapp.com/news?title=${title}`);
		return dispatch({ type: SEARCH_SEARCH, payload: data });
	}catch(error){
		swal({
			title: "No se encontró su busqueda.",
			text: "Intente escribir un nombre de una noticia o asegurese de que este bien escrito.",
			icon: "error",
			button: "Ok."
		})
	}
};
}
export function filterNewsByName(name) {
	return async (dispatch) => {
		let { data } = await axios.get(`https://backhenryclub.herokuapp.com/news?name=${name}`);
		return dispatch({ type: SEARCH_SEARCH, payload: data });
	};
}
//Limpiar estado de comentarios (Decidir si usamos un clear para cada estado o uno general para todos los estados de detalles)
export function clearComments() {
	return { type: CLEAR_COMMENTS };
}

//Filtrar por categoria:

export function filterCategory(payload) {
  return { type: 'FILTER_CATEGORY', payload: payload };
}
export function filterDefaultCategory(payload) {
  return { type: 'DEFAULT_FILTER_CATEGORY', payload: payload };
}
//Limpiar estado
export const clearPage = () => {
	return {
		type: CLEAR_PAGE,
	};
};

export function jasonWebToken(input) {
	return async (dispatch) => {
		try {
			console.log(url)
			let { data } = await axios.post(`${url}/login`, input);
			dispatch({ type: JWT, payload: data });
			// localStorage.setItem(data);

			window.localStorage.setItem("token", JSON.stringify(data));
			localStorage.setItem(
				"data",
				JSON.stringify(jwt_decode(data.loginKey).user)
			);
			return data;
		} catch (error) {
			alert(error);
		}
	};
}

export function clearMemberDetail() {

	return { type: CLEAR_MEMBER_DETAIL };
}

export function sendContact(input) {
	return async (dispatch) => {
		try {
			const { data } = await axios.post("https://backhenryclub.herokuapp.com/Contact", input);
			console.log(data);
			alert("Se ha enviado los datos");
			return data;
		} catch (error) {
			alert(
				"No se pudo enviar los datos, pongase en contacto con el administrador"
			);
			alert(error.response.data);
		}
	};
}

export function googleLogin(input) {
	return async dispatch => {
		console.log("Procesando token de google...");

		const user = {
			name: input.given_name,
			surname: input.family_name,
			email: input.email,
			username: input.nickname,
			photo: input.picture,
			sub: input.sub,
		};

		const { data } = await axios.post("https://backhenryclub.herokuapp.com/auth0", user);
    dispatch({ type: JWT, payload: data })

		window.localStorage.setItem("token", JSON.stringify(data));
		localStorage.setItem(
			"data",
			JSON.stringify(jwt_decode(data.loginKey).user)
		);

		console.log("Listo");

		return data;
	};
}

export function postNewLetters(payload){
  return async function(){
    const json = await axios.post('https://backhenryclub.herokuapp.com/newsletter', payload);
    return json
  }
}

export function getNewLetters() {
	return async function (dispatch) {
		const { data } = await axios.get("https://backhenryclub.herokuapp.com/newsletter");
		return dispatch({
			type: GET_NEW_LETTERS,
			payload: data,
		});
	};
}


export function banMember(id, input){
	return async function(){
		const ban = {isBanned: !input.isBanned}
		const {data} = await axios.put(`https://backhenryclub.herokuapp.com/user/${id}`, ban)
		return data
	}
}