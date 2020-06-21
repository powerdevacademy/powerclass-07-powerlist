import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, getTodos } from "../actions/todos";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TodoForm from "../components/TodoForm";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  link: {
    color: "inherit",
  },
  columnComplete: {
    width: "10%",
  },
  columnItem: {
    width: "10%",
  },
  columnTitle: {
    width: "70%",
  },
  columnDelete: {
    width: "10%",
  },
  rowHeader: {
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.white,
  },
}));

const TaskList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(
      getTodos((res, err) => {
        if (err) {
          alert(err);
          return;
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1> Lista de Tarefas </h1>
      <TodoForm />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.rowHeader}>
              <TableCell className={classes.columnComplete} align="center">
                Done
              </TableCell>
              <TableCell className={classes.columnItem} align="right">
                ID
              </TableCell>
              <TableCell className={classes.columnTitle}>Item</TableCell>
              <TableCell className={classes.columnDelete} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  <Checkbox
                    checked={!!row.complete}
                    onChange={() => dispatch(toggleTodo(row.id))}
                    name="complete"
                    color="secondary"
                  />
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.item}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(removeTodo(row.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
