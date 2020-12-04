import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../template/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";

const URL = "http://localhost:3004/api/todos";

export default (props) => {
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => refresh(), []);

  const refresh = (desc = "") => {
    const search = desc ? `&description__regex=/${desc}/` : "";
    console.log(`${URL}?sort=-createdAt${search}`);
    axios.get(`${URL}?sort=-createdAt${search}`).then((resp) => {
      setList(resp.data);
      setDescription(desc);
    });
  };

  const handleSearch = () => {
    refresh(description);
  };

  const handleRemove = (todo) => {
    axios.delete(`${URL}/${todo._id}`).then((resp) => {
      refresh(description);
    });
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMarkAsDone = (todo) => {
    axios
      .put(`${URL}/${todo._id}`, { done: true })
      .then((resp) => refresh(description));
  };

  const handleMarkAsPending = (todo) => {
    axios
      .put(`${URL}/${todo._id}`, { done: false })
      .then((resp) => refresh(description));
  };

  const handleAdd = () => {
    axios.post(URL, { description }).then((resp) => refresh());
  };

  const handleClear = () => {
    refresh();
  };

  return (
    <div>
      <PageHeader name="Tarefas" small="Cadastro" />
      <TodoForm
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <TodoList
        handleRemove={handleRemove}
        handleMarkAsPending={handleMarkAsPending}
        handleMarkAsDone={handleMarkAsDone}
      />
    </div>
  );
};
