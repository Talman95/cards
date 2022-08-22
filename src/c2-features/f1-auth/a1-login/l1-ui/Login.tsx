import React, {FC} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../l2-bll/authReducer";
import {RootStateType} from "../../../../c1-main/m2-bll/store";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: FC = () => {
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch<any>()
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
            dispatch(login(values));
            formik.resetForm({})
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
                    <button type={"submit"} >Sign In</button>
                    <div>
                        <p>Already have an account</p>
                        <p>Sign Up</p>
                    </div>
                </form>
            </div>
        </div>
    )
};