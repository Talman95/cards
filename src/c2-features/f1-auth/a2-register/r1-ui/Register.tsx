import React, {FC, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../../c1-main/m1-ui/routes/RoutesPage";
import {useFormik} from "formik";
import {register, setRegister} from "../../a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {Button, FormControl, FormGroup, Grid, Link, TextField, Typography} from "@mui/material";

type FormikErrorType = {
    email?: string
    password?: string
    confirmedPass?: string
}

export const Register: FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isRegistered = useAppSelector(state => state.auth.isRegistered)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const navigateToLogin = () => navigate(PATH.LOGIN)

    useEffect(() => {
        return () => {
            dispatch(setRegister(false))
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPass: '',
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
            if (!values.confirmedPass) {
                errors.confirmedPass = 'Required';
            } else if (values.password !== values.confirmedPass) {
                errors.confirmedPass = 'The password confirmation does not match'
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(register({email: values.email, password: values.password}))
        },
    })

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }
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
                                Sign Up
                            </Typography>
                            <TextField
                                label={'Enter your email'}
                                margin={'normal'}
                                type={'email'}
                                {...formik.getFieldProps("email")}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                label={'Enter your password'}
                                margin={'normal'}
                                type={'password'}
                                {...formik.getFieldProps("password")}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                label={'Confirm your password'}
                                margin={'normal'}
                                type={'password'}
                                {...formik.getFieldProps("confirmedPass")}
                                error={formik.touched.confirmedPass && Boolean(formik.errors.confirmedPass)}
                                helperText={formik.touched.confirmedPass && formik.errors.confirmedPass}
                                style={{marginBottom: '25px'}}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Sign Up
                            </Button>
                            <p style={{alignSelf: 'center'}}>Already have an account?</p>
                            <Link component="button" onClick={navigateToLogin} variant={'body1'}>
                                Sign In
                            </Link>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
};


// <div>
//     <h3>Sign Up</h3>
//     <div style={{display: 'flex', flexDirection: 'column'}}>
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input
//                     type={"text"}
//                     placeholder={"Enter your email..."}
//                     {...formik.getFieldProps("email")}
//                 />
//                 {formik.touched.email && formik.errors.email ?
//                     <div style={{color: "red"}}>{formik.errors.email}</div> : null}
//             </div>
//             <div>
//                 <input
//                     type={"password"}
//                     placeholder={"Enter your password..."}
//                     {...formik.getFieldProps("password")}
//                 />
//                 {formik.touched.password && formik.errors.password ?
//                     <div style={{color: "red"}}>{formik.errors.password}</div> : null}
//             </div>
//             <div>
//                 <input
//                     type={"password"}
//                     placeholder={"Confirm your password..."}
//                     {...formik.getFieldProps("confirmedPass")}
//                 />
//                 {formik.touched.confirmedPass && formik.errors.confirmedPass ?
//                     <div style={{color: "red"}}>{formik.errors.confirmedPass}</div> : null}
//             </div>
//             <div>
//                 <button type={"submit"}>Sign Up</button>
//             </div>
//             <div>
//                 <p>Already have an account?</p>
//                 <p><span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={navigateToLogin}>Sign In</span></p>
//             </div>
//         </form>
//     </div>
// </div>