import React, {FC, useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword, setStatusPassword} from "../../a1-login/l2-bll/authReducer";
import {RootStateType} from "../../../../c1-main/m2-bll/store";

type FormikErrorType = {
    password?: string
}
type FormikValuesType = {
    password: string
}

export const SetPassword: FC = () => {
    const dispatch = useDispatch<any>()
    const isChangedPassword = useSelector<RootStateType, boolean>(state => state.auth.isChangedPassword)
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h3>Create new password</h3>
                <div>
                    <input type={'password'} {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                </div>
                <p>
                    Create a new password and try to logging in again
                </p>
                <button>
                    Create new password
                </button>
            </form>
        </div>
    )
};