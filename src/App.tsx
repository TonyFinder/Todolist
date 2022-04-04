import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {Todolist} from './Components/Todolist/Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addTodolistTC, setTodolistsTC} from './core/reducer-todolist';
import {AppStateRootType} from './core/store/store';

export const App = React.memo( () => {
    console.log("App")

    useEffect(()=>{
        dispatch(setTodolistsTC())
        // eslint-disable-next-line
    },[])

    //Хуки React-Redux
    let dispatch = useDispatch()
    let todolists = useSelector<AppStateRootType, string[]>(state => state.todolists.map(m => m.id))

    //Добавление тудулиста
    const addTodolist = useCallback( (title: string) => dispatch(addTodolistTC(title)), [dispatch])

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