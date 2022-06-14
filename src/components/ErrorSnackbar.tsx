import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {SetAppErrorAC} from '../store/reducers/appReducer';
import {useAppDispatch} from '../store/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type ErrorSnackbarPropsType = {
    error: string;
}

export const ErrorSnackbar = (props: ErrorSnackbarPropsType) => {

    const dispatch = useAppDispatch();
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(SetAppErrorAC(null));
    };

    return (
        <Snackbar open={props.error !== null} autoHideDuration={3300} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                😠 {props.error}
            </Alert>
        </Snackbar>
    );
};
