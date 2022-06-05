import React, {useCallback, useEffect} from 'react';
import {Todolists} from '../features/TodolistsList/Todolists';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {useCustomSelector} from './store';
import ErrorSnackbar from '../components/ErrorSnackbar/ErrorSnackbar';
import {RequestStatusType} from '../utils/enums';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Error404} from '../features/Error404/Error404';
import {AppStateType, initializeAppTC} from '../features/app-reducer';
import {useDispatch} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from '../features/auth-reducer';

type AppPropsType = {
    demo?: boolean
}

export const App = React.memo( ({demo = false}: AppPropsType) => {
    console.log("App")

    const {loadingStatus, isInitialized} = useCustomSelector<AppStateType>(state => state.app)
    const isLoggedIn = useCustomSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => dispatch(logoutTC()), [dispatch])

    useEffect(()=> {
        dispatch(initializeAppTC())
        // eslint-disable-next-line
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                        <IconButton edge={'start'} color={'inherit'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'} style={{margin: 'auto'}}>
                            Todolists
                        </Typography>
                    </div>
                    <div>
                        {isLoggedIn && <Button variant={'outlined'} color="inherit" onClick={logoutHandler}>Logout</Button>}
                    </div>
                </Toolbar>
            </AppBar>
            {loadingStatus === RequestStatusType.loading && <LinearProgress color="success"/>}

            <Routes>
                <Route path='/' element={<Todolists demo={demo}/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='*' element={<Navigate to='404'/>}></Route>
                <Route path='404' element={<Error404/>}></Route>
            </Routes>

            <ErrorSnackbar/>
        </div>
    );
})