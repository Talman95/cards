import React, { FC, useState } from 'react';

import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { Navigate, useParams } from 'react-router-dom';

import { path } from '../../../enums/path';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { allAuthActions } from '../../../store';

type FormikErrorType = {
  password?: string;
};
type FormikValuesType = {
  password: string;
};

const SetPassword: FC = () => {
  const dispatch = useAppDispatch();

  const [isCreated, setIsCreated] = useState(false);

  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.password) {
        errors.password = 'Required';
      }
    },
    onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
      const action = await dispatch(
        allAuthActions.setNewPassword({ password: values.password, token }),
      );

      if (allAuthActions.setNewPassword.rejected.match(action)) {
        if (action.payload?.error) {
          formikHelpers.setFieldError('password', action.payload.error);
        }
      } else {
        setIsCreated(true);
      }
    },
  });

  if (isCreated) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <Grid container justifyContent="center" style={{ maxWidth: '250px' }}>
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <Typography variant="h6" style={{ alignSelf: 'center', margin: '16px 0' }}>
                Create new password
              </Typography>
              <TextField
                label="Password"
                margin="normal"
                type="password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <p style={{ alignSelf: 'center' }}>
                Create a new password and try to loggin again
              </p>
              <Button type="submit" variant="contained" color="primary">
                Create new password
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default SetPassword;
