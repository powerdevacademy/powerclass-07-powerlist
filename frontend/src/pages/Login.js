import React, { useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import {TextField} from "formik-material-ui";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

import { login } from "../actions/session";
import { Formik, Form, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "inherit",
  },
}));

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string().required("Obrigatório"),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userIsLogged = useSelector((state) => state.session.isLogged);

  useEffect(() => {
    if (userIsLogged) {
      history.push("/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLogged]);

  const _onSubmit = (values, { setSubmitting }) => {
     dispatch(login(values, (res, err) => {
      setSubmitting(false);
      if(err) {
          alert(err);
          return;
      }
    }));
  };

  return (
    <>
      <h1>Login</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="username"
              label="Email"
              type="text"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

            <Field
              name="password"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

            <Button
              href=''
              className={classes.submit}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting}
            >
              Entrar
            </Button>

            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link
                  to="/cadastro"
                  variant="body2"
                  margin="normal"
                  className={classes.link}>
                  Não tem uma conta? Se cadastre!
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
