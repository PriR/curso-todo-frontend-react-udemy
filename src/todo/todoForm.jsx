import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription, search } from "./todoActions";

const TodoForm = (props) => {
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      e.shiftKey ? props.handleSearch() : props.handleAdd();
    } else if (e.key === "Escape") {
      props.handleClear();
    }
  };

  useEffect(() => {
    props.search();
  }, []);

  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input
          id="description"
          className="form-control"
          placeholder="Adicione uma tarefa"
          value={props.description}
          onChange={props.changeDescription}
          onKeyUp={keyHandler}
        />
      </Grid>

      <Grid cols="12 3 2">
        <IconButton style="primary" icon="plus" onClick={props.handleAdd} />
        <IconButton style="info" icon="search" onClick={props.handleSearch} />
        <IconButton style="default" icon="close" onClick={props.handleClear} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({ description: state.todo.description });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeDescription, search }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
