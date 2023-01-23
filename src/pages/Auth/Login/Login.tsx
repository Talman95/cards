import React, { FC } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { path } from '../../../enums/path';
import { useActions } from '../../../hooks/useActions';
import { allAuthActions, authSelectors } from '../../../store';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login: FC = () => {
  const navigate = useNavigate();

  const { login } = useActions(allAuthActions);

  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

  const navigateToRegister = (): void => navigate(path.REGISTER);
  const navigateToForgot = (): void => navigate(path.FORGOT_PASSWORD);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },
    onSubmit: values => {
      login(values);
    },
  });

  if (isLoggedIn) {
    return <Navigate to={path.PROFILE} />;
  }

  return (
    <Grid container justifyContent="center" style={{ width: '300px' }}>
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <Typography variant="h6" style={{ alignSelf: 'center', margin: '16px 0' }}>
                Sign In
              </Typography>
              <TextField
                label="Email"
                margin="normal"
                type="email"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                label="Remember me?"
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button onClick={navigateToForgot} variant="text">
                Forgot password?
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
              <p style={{ alignSelf: 'center' }}>Don&apos;t have an account?</p>
              <Button onClick={navigateToRegister} variant="text">
                Sign Up
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
