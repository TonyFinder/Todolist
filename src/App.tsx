import React, {useCallback} from 'react';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {Todolist} from './Components/Todolist/Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addTodolistAC} from './core/reducer-todolist';
import {AppStateRootType} from './core/store/store';

export type FilterProps = 'All' | 'Active' | 'Completed'
export type todolistsPropsType = {
    id: string
    title: string
    filter: FilterProps
}
export type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type tasksPropsType = {
    [key: string]: taskPropsType[]
}

export const App = React.memo( () => {
    // console.log("App")
    //Хуки React-Redux
    let dispatch = useDispatch()
    let todolists = useSelector<AppStateRootType, string[]>(state => state.todolists.map(m => m.id))

    //Добавление тудулиста
    const addTodolist = useCallback( (title: string) => dispatch(addTodolistAC(title)), [dispatch])

    //Отрисовка тудулистов
    const todolistComponents = todolists.map(mt => {
        return (
            <Grid item key={mt}>
                <Paper elevation={4} style={{padding: '15px'}}>
                    <Todolist
                        todolistId={mt}
                    />
                </Paper>
            </Grid>
        )
    })

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
            <Container maxWidth={'xl'}>
                <Grid container style={{justifyContent: 'center', margin: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
} )