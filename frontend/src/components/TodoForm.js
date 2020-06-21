import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { addTodo } from "../actions/todos";
import { InputBase } from "formik-material-ui";
import {
  makeStyles,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginBottom: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const initialValues = {
  item: "",
};

const validationSchema = Yup.object({
  item: Yup.string().required("Obrigatório"),
});

const TodoForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const _onSubmit = ({ item }, { resetForm, setSubmitting }) => {
    dispatch(
      addTodo(item, (res, err) => {
        setSubmitting(false);
        if (err) {
          alert(err);
          return;
        }
        resetForm(); 
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={_onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Paper  className={classes.root}>
            <Field
              name="item"
              // label="O que você precisa fazer?"
              placeholder="O que você precisa fazer?"
              type="text"
              // margin="normal"
              // variant="outlined"
              required
              className={classes.input}
              component={InputBase}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="secondary"
              type="submit"
              className={classes.iconButton}
              aria-label="adicionar"
            >
              <AddCircleIcon />
            </IconButton>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
