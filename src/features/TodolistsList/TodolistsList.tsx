import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, setTodolistsTC} from '../reducer-todolist';
import {useDispatch} from 'react-redux';
import {useCustomSelector} from '../../app/store';
import {Todolist} from './Todolist/Todolist';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList = React.memo(({demo = false}: TodolistsListPropsType) => {
    console.log("TodolistsList")

    useEffect(() => {
        if (demo) return
        dispatch(setTodolistsTC())
        // eslint-disable-next-line
    }, [])

    let dispatch = useDispatch()
    let todolists = useCustomSelector<string[]>(state => state.todolists.map(m => m.id))

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
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
})