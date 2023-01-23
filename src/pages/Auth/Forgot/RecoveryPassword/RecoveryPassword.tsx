import React, { FC } from 'react';

import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { path } from '../../../../enums/path';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { allAuthActions } from '../../../../store';

type ForgotErrorsType = {
  email?: string;
};
type FormikValuesType = {
  email: string;
};
type PropsType = {
  toSend: () => void;
  setEmail: (email: string) => void;
};

export const RecoveryPassword: FC<PropsType> = ({ toSend, setEmail }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navigateToLogin = (): void => navigate(path.LOGIN);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: ForgotErrorsType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
      const action = await dispatch(allAuthActions.sendPassword(values.email));

      if (allAuthActions.sendPassword.rejected.match(action)) {
        if (action.payload?.error) {
          formikHelpers.setFieldError('email', action.payload.error);
        }
      } else {
        setEmail(values.email);
        toSend();
      }
    },
  });

  return (
    <Grid item justifyContent="center">
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <Typography variant="h6" style={{ alignSelf: 'center', margin: '16px 0' }}>
              Forgot your password?
            </Typography>
            <TextField
              label="Email"
              margin="normal"
              type="email"
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <p style={{ alignSelf: 'center' }}>
              Enter your email address and we will send you further instructions
            </p>
            <Button type="submit" variant="contained" color="primary">
              Send instructions
            </Button>
            <p style={{ alignSelf: 'center' }}>Did you remember your password?</p>
            <Button onClick={navigateToLogin} variant="text">
              Try loggin in
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};
