import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

import { getTodos, deleteTodo } from "../services/todoService";
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import Error from "./Error";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 10,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 5,
  },
  paper: {
    position: "absolute",
    border: "2px solid #000",
    backgroundColor: "white",
    padding: (10, 10, 10, 10),
  },
});

const ListTodos = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [modalState, setModalState] = useState({ open: false, todoId: null });
  const [error, setError] = useState("");

  const handleOpen = (todoId) => () => {
    setModalState({ open: true, todoId: todoId });
  };

  const handleClose = () => {
    setModalState({ open: false });
  };

  const deleteTodoHandler = async (todoId) => {
    try {
      const response = await deleteTodo(todoId);
      if (response.status != 200) {
        setError(response.data);
      } else {
        setTodos(todos.filter((todo) => todo.todo_id !== todoId));
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (err) {
        setError(err.response.data);
      }
    };
    getAllTodos();
  }, []);

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputTodo />
        </Grid>
        <Grid item xs={12}>
          {error && <Error error={error} />}
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Edit</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.todo_id}>
                    <TableCell component="th" scope="row">
                      {todo.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen(todo.todo_id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => deleteTodoHandler(todo.todo_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <Modal open={modalState.open} onClose={handleClose}>
                  <div style={modalStyle} className={classes.paper}>
                    <EditTodo
                      todo={
                        todos.filter(
                          (todo) => todo.todo_id === modalState.todoId
                        )[0]
                      }
                      handleClose={handleClose}
                    />
                  </div>
                </Modal>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ListTodos;
