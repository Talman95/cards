import React, {FC, useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {FormikHelpers, useFormik} from "formik";
import {setStatusPassword} from "../../store/Auth/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button, FormControl, FormGroup, Grid, TextField, Typography} from "@mui/material";
import {setNewPassword} from "../../store/Auth/asyncThunk";

type FormikErrorType = {
    password?: string
}
type FormikValuesType = {
    password: string
}

export const SetPassword: FC = () => {
    const dispatch = useAppDispatch()
    const isChangedPassword = useAppSelector(state => state.auth.isChangedPassword)
    let {token} = useParams()

    useEffect(() => {
        return () => {
            dispatch(setStatusPassword(false))
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            }
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(setNewPassword({password: values.password, token: token}))
            if (setNewPassword.rejected.match(action)) {
                if (action.payload?.error) {
                    formikHelpers.setFieldError('password', action.payload.error)
                }
            }
        }
    })

    if (isChangedPassword) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Grid container justifyContent={'center'} style={{maxWidth: '250px'}}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <Typography variant="h6" style={{alignSelf: 'center', margin: '16px 0'}}>
                                Create new password
                            </Typography>
                            <TextField
                                label={'Password'}
                                margin={'normal'}
                                type={'password'}
                                {...formik.getFieldProps("password")}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <p style={{alignSelf: 'center'}}>
                                Create a new password and try to loggin again
                            </p>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Create new password
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
};