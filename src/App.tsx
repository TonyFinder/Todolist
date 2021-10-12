import React, {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


export type FilterProps = 'All' | 'Active' | 'Completed'

export type toDoListsPropsType = {
    id: string
    title: string
    filter: FilterProps
}

export type taskPropsType = {
    id: string
    term: string
    isDone: boolean
}

export type tasksPropsType = {
    [key: string]: taskPropsType[]
}

function App() {

    const toDoList_1 = v1()
    const toDoList_2 = v1()

    let [toDoLists, setToDoLists] = useState<toDoListsPropsType[]>([
        {id: toDoList_1, title: 'What to learn', filter: 'All'},
        {id: toDoList_2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState<tasksPropsType>({
        [toDoList_1]: [
            {id: v1(), term: 'HTML&CSS', isDone: true},
            {id: v1(), term: 'JS', isDone: true},
            {id: v1(), term: 'React', isDone: false},
            {id: v1(), term: 'Redux', isDone: false},
            {id: v1(), term: 'Node', isDone: false},
            {id: v1(), term: 'React Native', isDone: false}
        ],
        [toDoList_2]: [
            {id: v1(), term: 'Bread', isDone: false},
            {id: v1(), term: 'Milk', isDone: true},
            {id: v1(), term: 'Soap', isDone: false}
        ]
    })

    const removeTask = (taskID: string, toDoListId: string) => {
        tasks[toDoListId] = tasks[toDoListId].filter(ft => ft.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = (title: string, toDoListId: string) => {
        const newTask = {id: v1(), term: title.trim(), isDone: false}
        tasks[toDoListId] = [newTask, ...tasks[toDoListId]]
        setTasks({...tasks})
    }

    const changeCheckbox = (id: string, checked: boolean, toDoListId: string) => {
        tasks[toDoListId] = tasks[toDoListId].map(mt => mt.id === id ? {...mt, isDone: checked} : mt)
        setTasks({...tasks})
    }

    const filterTask = (filterId: FilterProps, toDoListId: string) => {
        setToDoLists(toDoLists.map(mt => mt.id === toDoListId ? {...mt, filter: filterId} : mt))
    }

    const removeToDoList = (toDoListId: string) => {
        setToDoLists(toDoLists.filter(ft => ft.id !== toDoListId))
        delete tasks[toDoListId]
    }

    const addToDoList = (title: string) => {
        const toDoListID = v1()
        setToDoLists([...toDoLists, {id: toDoListID, title, filter: 'All'}])
        setTasks({...tasks, [toDoListID]: []})
    }

    const changedTitleTask = (title: string, toDoListId: string, taskId: string) => {
        tasks[toDoListId] = tasks[toDoListId].map(m => m.id === taskId ? {...m, term: title} : m)
        setTasks({...tasks})
    }

    const changeToDoListTitle = (title: string, toDoListId: string) => {
        setToDoLists(toDoLists.map(m => m.id === toDoListId ? {...m, title} : m))
    }

    const toDolistComponents = toDoLists.map(mt => {
        let sito = tasks[mt.id]
        if (mt.filter === 'Completed') {
            sito = tasks[mt.id].filter(f => f.isDone)
        }
        if (mt.filter === 'Active') {
            sito = tasks[mt.id].filter(f => !f.isDone)
        }

        return (
            <Grid item key={mt.id}>
                <Paper elevation={4} style={{padding: "15px"}}>
                    <Todolist
                        id={mt.id}
                        title={mt.title}
                        task={sito}
                        filter={mt.filter}
                        removeTask={removeTask}
                        filterTask={filterTask}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox}
                        removeToDoList={removeToDoList}
                        changedTitleTask={changedTitleTask}
                        changeToDoListTitle={changeToDoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
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
                <Grid container style={{justifyContent: 'center', margin: "20px"}}>
                    <AddItemForm addItem={addToDoList} filter={'All'}/>
                </Grid>
                <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    {toDolistComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
