import React, { FC, useEffect } from 'react';

import {
  Button,
  FormControl,
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
  confirmedPass?: string;
};

const Register: FC = () => {
  const navigate = useNavigate();

  const { setRegister, register } = useActions(allAuthActions);

  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  const isRegistered = useSelector(authSelectors.selectIsRegistered);

  useEffect(() => {
    return () => {
      setRegister(false);
    };
  }, []);

  const navigateToLogin = (): void => navigate(path.LOGIN);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmedPass: '',
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
      if (!values.confirmedPass) {
        errors.confirmedPass = 'Required';
      } else if (values.password !== values.confirmedPass) {
        errors.confirmedPass = 'The password confirmation does not match';
      }

      return errors;
    },
    onSubmit: values => {
      register({ email: values.email, password: values.password });
    },
  });

  if (isRegistered) {
    return <Navigate to={path.LOGIN} />;
  }
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
                Sign Up
              </Typography>
              <TextField
                label="Enter your email"
                margin="normal"
                type="email"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Enter your password"
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                label="Confirm your password"
                margin="normal"
                type="password"
                {...formik.getFieldProps('confirmedPass')}
                error={
                  formik.touched.confirmedPass && Boolean(formik.errors.confirmedPass)
                }
                helperText={formik.touched.confirmedPass && formik.errors.confirmedPass}
                style={{ marginBottom: '25px' }}
              />
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
              <p style={{ alignSelf: 'center' }}>Already have an account?</p>
              <Button onClick={navigateToLogin} variant="text">
                Sign In
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
