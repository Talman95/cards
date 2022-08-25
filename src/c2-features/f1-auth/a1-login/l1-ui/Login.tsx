import React, {FC} from 'react';
import {FormikHelpers, useFormik} from "formik";
import {login} from "../l2-bll/authReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../../c1-main/m1-ui/main/routes/MyRoutes";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login: FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.error) {
                    formikHelpers.setFieldError('password', action.payload.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            Login
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input type={"email"} {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <input type={"password"} {...formik.getFieldProps("password")}/>
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                    </div>
                    <div>
                        <input type={"checkbox"} {...formik.getFieldProps("rememberMe")}/>
                        <span>Remeber me?</span>
                    </div>
                    <button type={"submit"}>Sign In</button>
                    <p>
                        <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={navigateToForgot}>
                            Forgot password?
                        </span>
                    </p>
                    <div>
                        <p>Already have an account</p>
                        <p>
                            <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={navigateToRegister}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};