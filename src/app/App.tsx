import React from 'react';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {useCustomSelector} from './store';
import {RequestStatusType} from '../features/app-reducer';
import CustomizedSnackbars from '../components/Snackbar/Snackbar';

export const App = React.memo( () => {
    console.log("App")

    const loadingStatus = useCustomSelector<RequestStatusType>(state => state.app.loadingStatus)

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {loadingStatus === 'loading' && <LinearProgress color="success"/>}

            <TodolistsList/>

            <CustomizedSnackbars/>
        </div>
    );
} )