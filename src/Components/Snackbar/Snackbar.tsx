import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useCustomSelector} from '../../app/store';
import {changeAppErrorValue, NullPossibleType} from '../../features/app-reducer';
import {useDispatch} from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const error = useCustomSelector<NullPossibleType<string>>(state => state.app.errorServer)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(changeAppErrorValue(null))
    };

    return (
            <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>
    );
}
