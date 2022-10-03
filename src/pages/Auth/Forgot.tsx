import React, {FC, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {FormikHelpers, useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button, FormControl, FormGroup, Grid, Link, TextField, Typography} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import {allAuthActions} from "../../store";
import {PATH} from "../../components/routes/RoutesPage";

type ForgotErrorsType = {
    email?: string
}
type FormikValuesType = {
    email: string
}

export const Forgot: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {setSend} = useActions()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isSent = useAppSelector(state => state.auth.isSent)

    const navigateToLogin = () => navigate(PATH.LOGIN)

    useEffect(() => {
        return () => {
            setSend(false)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: ForgotErrorsType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(allAuthActions.sendPassword(values.email))
            if (allAuthActions.sendPassword.rejected.match(action)) {
                if (action.payload?.error) {
                    formikHelpers.setFieldError('email', action.payload.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{maxWidth: '250px'}}>
            {isSent
                ?
                <Grid item justifyContent={'center'}>
                    <FormGroup>
                        <Typography variant="h6" style={{alignSelf: 'center', marginTop: '16px'}}>
                            Check Email
                        </Typography>
                        <Typography style={{margin: '16px 0'}}>
                            We've sent an Email with instructions to {formik.values.email}
                        </Typography>
                        <Button variant={'contained'} color={'primary'} onClick={navigateToLogin}>
                            Back to login
                        </Button>
                    </FormGroup>
                </Grid>
                :
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <Typography variant="h6" style={{alignSelf: 'center', margin: '16px 0'}}>
                                    Forgot your password?
                                </Typography>
                                <TextField
                                    label={'Email'}
                                    margin={'normal'}
                                    type={'email'}
                                    {...formik.getFieldProps("email")}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <p style={{alignSelf: 'center'}}>
                                    Enter your email address and we will send you further instructions
                                </p>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Send instructions
                                </Button>
                                <p style={{alignSelf: 'center'}}>Did you remember your password?</p>
                                <Link component="button" onClick={navigateToLogin} variant={'body1'}>
                                    Try loggin in
                                </Link>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>}
        </Grid>
    )
}