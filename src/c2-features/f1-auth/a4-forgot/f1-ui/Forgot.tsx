import React, {FC, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FormikHelpers, useFormik} from "formik";
import {sendPassword, setSend} from "../../a1-login/l2-bll/authReducer";
import {RootStateType} from "../../../../c1-main/m2-bll/store";

type ForgotErrorsType = {
    email?: string
}
type FormikValuesType = {
    email: string
}

export const Forgot: FC = () => {
    const navigate = useNavigate()
    const navigateToLogin = () => navigate('/login')
    const dispatch = useDispatch<any>()
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const isSent = useSelector<RootStateType, boolean>(state => state.auth.isSent)

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
        <div>
            {isSent
                ?
                <div>
                    <h3>Check Email</h3>
                    <p>We've sent an Email with instructions to {formik.values.email}</p>
                </div>
                :
                <form onSubmit={formik.handleSubmit}>
                    <h3>Forgot your password?</h3>
                    <div>
                        <input type={'email'} {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                    </div>
                    <p>Enter your email address and we will send you further instructions</p>
                    <div>
                        <button type={'submit'}>Send instructions</button>
                    </div>
                    <p>Did you remember your password?</p>
                    <p>
                <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={navigateToLogin}>
                    Try loggin in
                </span>
                    </p>
                </form>}
        </div>
    )
};