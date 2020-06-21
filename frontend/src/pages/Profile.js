import React, { useEffect, useState } from "react";
import { Button, makeStyles, Avatar } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import api from "../services/api";
import { update } from "../actions/session";

import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "inherit",
  },
  avatar: {
      margin: 'auto',
      width: '200px',
      height: '200px'
  }
}));

const validationSchema = Yup.object({
  username: Yup.string().email("Email inválido").required("Obrigatório"),
  name: Yup.string().required("Obrigatório"),
  password: Yup.string(),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
});

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [initialValues, setInitialValues] = useState({
    username: "",
    name: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    setInitialValues({
      username: user.username,
      name: user.name,
      password: "",
      confirm_password: "",
    });
  }, [user]);

  const _onSubmit = (values, { setSubmitting }) => {
    api
      .put("/users/" + user.id, {
        name: values.name,
        password: values.password,
        username: values.username,
      })
      .then(({ data }) => {
        setSubmitting(false);
        dispatch(update(data));
        alert("Usuário atualizado com sucesso");
      })
      .catch((err) => err?.response?.data?.error || err);
  };

  return (
    <>
      <h1>Perfil</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={_onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>

            <Avatar alt={user.name} src={user.picture} className={classes.avatar} />

            <Field
              name="name"
              label="Nome"
              type="text"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              component={TextField}
            />

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
              label="Senha"
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              component={TextField}
            />

            <Field
              name="confirm_password"
              label="Confirme a Senha"
              type="password"
              margin="normal"
              variant="outlined"
              fullWidth
              component={TextField}
            />

            <Button
              href=""
              className={classes.submit}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isSubmitting}
            >
              Atualizar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
