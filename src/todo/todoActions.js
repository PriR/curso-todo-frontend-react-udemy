import axios from "axios";
import todo from "./todo";

const URL = "http://localhost:3004/api/todos";

export const changeDescription = (event) => ({
  type: "DESCRIPTION_CHANGED",
  payload: event.target.value,
});

export const search = () => {
  return (dispatch, getState) => { // redux-thunk
    const description = getState().todo.description; // redux-thunk - para evitar de ter que passar sempre no parametro o description no search
    const search = description ? `&description__regex=/${description}/` : "";
    const request = axios
      .get(`${URL}?sort=-createdAt${search}`) // usa middleware applyMiddleware no index.jsx, n precisa esperar resolver
      .then((resp) => dispatch({ type: "TODO_SEARCHED", payload: resp.data }));
  };
};

export const add = (description) => {
  return (dispatch) => {
    axios
      .post(URL, { description })
      .then((resp) => dispatch(clear()))
      .then((resp) => dispatch(search())); // precisa receber resp senão n funciona logo ao clicar
  };
};

export const markAsDone = (todo) => {
  return (dispatch) => {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then((resp) => dispatch(search())); // precisa receber resp senão n funciona logo ao clicar
  };
};

export const markAsPending = (todo) => {
  return (dispatch) => {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then((resp) => dispatch(search())); // precisa receber resp senão n funciona logo ao clicar
  };
};

export const remove = (todo) => {
  return (dispatch) => {
    axios
      .delete(`${URL}/${todo._id}`)
      .then(dispatch(search()))
      .then((resp) => dispatch(search())); // precisa receber resp senão n funciona logo ao clicar
  };
};

export const clear = () => {
  return [{ type: "TODO_CLEAR" }, search()]; // redux-multi
};
