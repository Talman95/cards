import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../c1-hooks/hooks";
import {setAppMessage} from "../../../c1-main/m2-bll/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SuccessSnackbar: FC = () => {
    const message = useAppSelector(state => state.app.message)
    const isOpen = message !== null
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppMessage(null))
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
}