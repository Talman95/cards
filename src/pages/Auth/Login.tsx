import React from 'react';
import {useFormik} from "formik";
import {login} from "../../store/Auth/asyncThunk";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../components/routes/RoutesPage";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const navigateToRegister = () => navigate(PATH.REGISTER)
    const navigateToForgot = () => navigate(PATH.FORGOT_PASSWORD)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
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
        onSubmit: (values) => {
            dispatch(login(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{width: '300px'}}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <Typography variant="h6" style={{alignSelf: 'center', margin: '16px 0'}}>
                                Sign In
                            </Typography>
                            <TextField
                                label={'Email'}
                                margin={'normal'}
                                type={'email'}
                                {...formik.getFieldProps("email")}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                label={'Password'}
                                margin={'normal'}
                                type={'password'}
                                {...formik.getFieldProps("password")}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <FormControlLabel
                                label={'Remember me?'}
                                control={
                                    <Checkbox {...formik.getFieldProps("rememberMe")}/>}
                            />
                            <Link component="button" onClick={navigateToForgot}
                                  style={{alignSelf: 'end', marginBottom: '16px'}}>
                                Forgot password?
                            </Link>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Sign In
                            </Button>
                            <p style={{alignSelf: 'center'}}>Don't have an account?</p>
                            <Link component="button" onClick={navigateToRegister} variant={'body1'}>
                                Sign Up
                            </Link>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
};