import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
  FILTER_NEWS,
  CLEAR_COMMENTS,
  DETAIL_EVENTO,
  ALL_EVENTO,
  GET_SPORT,
  GET_PROFILE,
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
} from './DataTypes';

//Get

export function getMembers() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/user');
      // window.localStorage.setItem(
      //   'logueado', data
      // )
      return dispatch({ type: ALL_MEMBERS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getContacts() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/contact');
      return dispatch({ type: ALL_CONTACTS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getGallery() {
  return async dispatch => {
    try {
      let { data } = await axios.get('Ruta para imagenes');
      return dispatch({ type: ALL_IMAGES, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getNews() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/news');
      return dispatch({ type: ALL_NEWS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getRoles() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/role');
      return dispatch({ type: ALL_ROLES, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getInscription() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/inscription');
      return dispatch({ type: ALL_INSCRIPTIONS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getComments(id) {
  return async dispatch => {
    try {
      let { data } = await axios.get(`http://localhost:3001/comment/${id}`);
      if (data) return dispatch({ type: ALL_COMMENTS, payload: data });
      //Necesitamos que si no encuentra ningun comentario que el back regrese un array vacío
      // else return dispatch({type:ALL_COMMENTS, payload:[]})
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function getEvents() {
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/calendar');
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
    const { data } = await axios.get('http://localhost:3001/sport');
    return dispatch({
      type: GET_SPORT,
      payload: data,
    });
  };
}

export function createSport(userId, input) {
  return async function () {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/sport/${userId}`,
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
    const { data } = await axios.get('http://localhost:3001/teacher');
    return dispatch({
      type: GET_TEACHER,
      payload: data,
    });
  };
}

export function getCategory() {
  return async function (dispatch) {
    const { data } = await axios.get('http://localhost:3001/category');
    return dispatch({
      type: GET_CATEGORY,
      payload: data,
    });
  };
}

export function getCategorySport() {
  return async function (dispatch) {
      const { data } = await axios.get('http://localhost:3001/categorysport')
      return dispatch({
          type: GET_CATEGORY_SPORT,
          payload: data,
      });
  };
}

export function createCategory(userId, input) {
  return async function () {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/category/${userId}`,
        input
      );
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function updateCategory(id, input) {
  return async dispatch => {
    try {
      let { data } = await axios.put(
        `http://localhost:3001/category/${id}`,
        input
      );
      return dispatch({ type: UPDATE_CATEGORY, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function deleteCategory(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/category/${id}`);
      return dispatch({ type: DELETE_CATEGORY, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//
export function loginMember(input) {
  return async function () {
    try {
      const { data } = await axios.post('http://localhost:3001/user', input);
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//Detail

export function detailMember(id) {
  return async dispatch => {
    try {
      let { data } = await axios.get(`http://localhost:3001/user/${id}`);
      return dispatch({ type: DETAIL_MEMBER, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function detailNews(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/news/${id}`);
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
      const json = await axios.get(`http://localhost:3001/calendar/${id}`);
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
      const { data } = await axios.get(`http://localhost:3001/categorysport/${id}`);
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
      const json = await axios.get(`http://localhost:3001/teacher/${id}`);
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
        `http://localhost:3001/news/crear/${userId}`,
        input
      );
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function createInscription(userId, input) {
  return async function () {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/inscription/${userId}`,
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
      const { data } = await axios.post(`http://localhost:3001/categorysport/`, input);
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function createMember(input) {
  return async () => {
    console.log(input);
    try {
      if (input.edad >= 18) {
        input.isOlder = true;
      } else {
        input.isOlder = false;
      }

      let { data } = await axios.post(
        `http://localhost:3001/user`,
        input
      );
      //Despachar accion o regresar mensaje?
      // return dispatch({type: })
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function createComment(newsId, userId, input) {
  return async dispatch => {
    try {
      console.log(newsId);
      console.log(userId);
      console.log(input);
      await axios.post(
        `http://localhost:3001/comment/comentar/${newsId}/${userId}`,
        input
      );

      // let {data} = await axios.get("http://localhost:3001/user")

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
      let { data } = await axios.post('http://localhost:3001/contact', input);
      return data;
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function postEvento(payload) {
  return async function () {
    const json = await axios.post('http://localhost:3001/calendar', payload);
    return json;
  };
}

//PUT
export function updateNews(id, input) {
  return async dispatch => {
    try {
      let { data } = await axios.put(`http://localhost:3001/news/${id}`, input);
      return dispatch({ type: UPDATE_NEWS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function updateComment(id, input) {
  return async dispatch => {
    try {
      let { data } = await axios.put(
        `http://localhost:3001/comment/${id}`,
        input
      );
      return dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function updateMember(id, input) {
  return async dispatch => {
    try {
      let { data } = await axios.put(`http://localhost:3001/user/${id}`, input);
      return dispatch({ type: UPDATE_MEMBER, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//DELETE
export function deleteNews(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/news/${id}`);
      return dispatch({ type: DELETE_NEWS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function deleteTeacher(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/news/${id}`);
      return dispatch({ type: DELETE_TEACHER, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function deleteComment(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/comment/${id}`);
      return dispatch({ type: DELETE_COMMENT, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

export function deleteMember(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/user/${id}`);
      return dispatch({ type: DELETE_MEMBER, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}
export function deleteContact(id) {
  return async dispatch => {
    try {
      let { data } = await axios.delete(`http://localhost:3001/contact/${id}`);
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
        'http://localhost:3001/profile/:id'
      ); /*"http://localhost:3001/profile/" + id lo puse asi para probar como se ve, para que funcione poner el codigo comentado*/
      return dispatch({
        type: 'GET_PROFILE',
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
  return async dispatch => {
    try {
      let { data } = await axios.get('http://localhost:3001/pay');
      return dispatch({ type: ALL_PAYS, payload: data });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//Filtrar noticias

export function filterNews(title) {
  return async dispatch => {
    let { data } = await axios.get(`http://localhost:3001/news?title=${title}`);
    return dispatch({ type: SEARCH_SEARCH, payload: data });
  };
}
export function filterNewsByName(name) {
  return async dispatch => {
    let { data } = await axios.get(`http://localhost:3001/news?name=${name}`);
    return dispatch({ type: SEARCH_SEARCH, payload: data });
  };
}
//Limpiar estado de comentarios (Decidir si usamos un clear para cada estado o uno general para todos los estados de detalles)
export function clearComments() {
  return { type: CLEAR_COMMENTS };
}

//Limpiar estado
export const clearPage = () => {
  return {
    type: CLEAR_PAGE,
  };
};

export function jasonWebToken(input) {
  return async dispatch => {
    try {
      let { data } = await axios.post('http://localhost:3001/login', input);
      dispatch({ type: JWT, payload: data });
      // localStorage.setItem(data);

      window.localStorage.setItem('token', JSON.stringify(data));
      localStorage.setItem(
        'data',
        JSON.stringify(jwt_decode(data.loginKey).user)
      );
      console.log(data);
      return data;
    } catch (error) {
      alert(error);
    }
  };
}

export function clearMemberDetail() {
  return {type: CLEAR_MEMBER_DETAIL}
}

export function sendContact(input) {
  return async dispatch => {
    try {
      const {data} = await axios.post("http://localhost:3001/Contact", input)
      console.log(data)
      alert("Se ha enviado los datos")
      return data
    } catch (error) {
      alert("No se pudo enviar los datos, pongase en contacto con el administrador")
      alert(error.response.data)
    }
  }
}