import React, {FC, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {FormikHelpers, useFormik} from "formik";
import {sendPassword, setSend} from "../../a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {Button, FormControl, FormGroup, Grid, Link, TextField, Typography} from "@mui/material";

type ForgotErrorsType = {
    email?: string
}
type FormikValuesType = {
    email: string
}

export const Forgot: FC = () => {
    const navigate = useNavigate()
    const navigateToLogin = () => navigate('/login')
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isSent = useAppSelector(state => state.auth.isSent)

    useEffect(() => {
        return () => {
            dispatch(setSend(false))
        }
    }, [dispatch])

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
            const action = await dispatch(sendPassword(values.email))
            if (sendPassword.rejected.match(action)) {
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
        <Grid container justifyContent={'center'} style={{maxWidth: '300px'}}>
            {isSent
                ?
                <Grid item justifyContent={'center'}>
                    <Typography variant="h6" style={{alignSelf: 'center', margin: '16px 0'}}>
                        Check Email
                    </Typography>
                    <Typography style={{alignSelf: 'center'}}>
                        We've sent an Email with instructions to {formik.values.email}
                    </Typography>
                    <Button variant={'contained'} color={'primary'} onClick={navigateToLogin}>
                        Back to login
                    </Button>
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
};