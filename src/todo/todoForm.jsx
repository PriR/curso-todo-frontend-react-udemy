import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription, search, add } from "./todoActions";

const TodoForm = (props) => {
  const { add, search, description } = props;
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      e.shiftKey ? search() : add(description);
    } else if (e.key === "Escape") {
      props.handleClear();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input
          id="description"
          className="form-control"
          placeholder="Adicione uma tarefa"
          value={description}
          onChange={props.changeDescription}
          onKeyUp={keyHandler}
        />
      </Grid>

      <Grid cols="12 3 2">
        <IconButton
          style="primary"
          icon="plus"
          onClick={() => add(description)}
        />
        <IconButton style="info" icon="search" onClick={() => search()} />
        <IconButton style="default" icon="close" onClick={props.handleClear} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({ description: state.todo.description });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeDescription, search, add }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
