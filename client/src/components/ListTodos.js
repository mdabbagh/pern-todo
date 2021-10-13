import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import { Grid } from "@material-ui/core";

import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import { getTodos, deleteTodo } from "../services/todoService";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 10,
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ListTodos = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [modalState, setModalState] = useState({ open: false, todoId: null });

  const handleOpen = (todoId) => () => {
    setModalState({ open: true, todoId: todoId });
  };

  const handleClose = () => {
    setModalState({ open: false });
  };

  const deleteTodoHandler = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.todo_id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (err) {
        //setUser(null);
        console.log(err);
      }
    };
    getAllTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} p={2}>
          <InputTodo />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
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
                        Edit Todo
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
