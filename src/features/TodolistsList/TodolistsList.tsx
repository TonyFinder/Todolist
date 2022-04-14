import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, setTodolistsTC} from '../reducer-todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateRootType} from '../../app/store';
import {Todolist} from './Todolist/Todolist';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export const TodolistsList = React.memo(() => {
    console.log("TodolistsList")

    useEffect(() => {
        dispatch(setTodolistsTC())
        // eslint-disable-next-line
    }, [])

    let dispatch = useDispatch()
    let todolists = useSelector<AppStateRootType, string[]>(state => state.todolists.map(m => m.id))

    const addTodolist = useCallback((title: string) => dispatch(addTodolistTC(title)), [dispatch])

    return (
        <Container maxWidth={'xl'}>
            <Grid container style={{justifyContent: 'center', margin: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                {todolists.map(mt => {
                    return (
                        <Grid item key={mt}>
                            <Paper elevation={4} style={{padding: '15px'}}>
                                <Todolist
                                    todolistId={mt}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
})