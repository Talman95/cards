import React, {FC, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../../c1-main/m1-ui/main/routes/MyRoutes";
import {FormikHelpers, useFormik} from "formik";
import {register, setRegister} from "../../a1-login/l2-bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";

type FormikErrorType = {
    email?: string
    password?: string
    confirmedPass?: string
}
type FormikValuesType = {
    email: string
    password: string
    confirmedPass: string
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
            if (values.password !== values.confirmedPass) {
                errors.confirmedPass = 'The password confirmation does not match'
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(register({email: values.email, password: values.password}))
            if (register.rejected.match(action)) {
                if (action.payload?.error) {
                    formikHelpers.setFieldError('confirmedPass', action.payload.error)
                }
            }
        },
    })

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }
    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h3>Sign Up</h3>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            type={"text"}
                            placeholder={"Enter your email..."}
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <input
                            type={"password"}
                            placeholder={"Enter your password..."}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                    </div>
                    <div>
                        <input
                            type={"password"}
                            placeholder={"Confirm your password..."}
                            {...formik.getFieldProps("confirmedPass")}
                        />
                        {formik.touched.confirmedPass && formik.errors.confirmedPass ?
                            <div style={{color: "red"}}>{formik.errors.confirmedPass}</div> : null}
                    </div>
                    <div>
                        <button type={"submit"}>Sign Up</button>
                    </div>
                    <div>
                        <p>Already have an account?</p>
                        <p><span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={navigateToLogin}>Sign In</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
};