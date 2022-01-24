import {Button, IconButton, List} from '@material-ui/core';
import React, {useCallback} from 'react';
import {FilterProps, taskPropsType, todolistsPropsType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {DeleteForeverTwoTone} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateRootType} from '../../core/store/store';
import {addTaskAC} from '../../core/reducer-tasks';
import {changeTodolistTitleAC, filterTaskAC, removeTodolistAC} from '../../core/reducer-todolist';
import {Task} from '../Task/Task';

type TodolistPropsType = {todolistId: string}

export const Todolist = React.memo( ({todolistId}: TodolistPropsType) => {
    // console.log("Todolist")
    //Хуки react-redux
    let dispatch = useDispatch()
    let todolist = useSelector<AppStateRootType, todolistsPropsType>(state => state.todolists.filter(f => f.id === todolistId)[0])
    let tasks = useSelector<AppStateRootType, taskPropsType[]>(state => state.tasks[todolistId])

    //Фильтрация тасков
    todolist.filter === 'Active'
        ? tasks = tasks.filter(f => !f.isDone)
        :
        todolist.filter === 'Completed'
            ? tasks = tasks.filter(f => f.isDone)
            : tasks = [...tasks]

    //Работа с тасками
    const addTask = useCallback( (title: string) => dispatch(addTaskAC(title, todolistId)), [dispatch, todolistId])
    const filterTasks = useCallback( (filter: FilterProps) => dispatch(filterTaskAC(filter, todolistId)), [dispatch, todolistId])

    // Работа с тудулистами
    const removeTodolist = useCallback( () => dispatch(removeTodolistAC(todolistId)), [dispatch, todolistId])
    const changeTodolistTitle = useCallback( (title: string) => dispatch(changeTodolistTitleAC(title, todolistId)), [dispatch, todolistId])

    return (
        <div>
            <IconButton onClick={removeTodolist}>
                <DeleteForeverTwoTone color={'secondary'}/>
            </IconButton>
            <h3><EditableSpan changedTitle={changeTodolistTitle} titleMain={todolist.title} completed={false}
                              header={true}/></h3>
            <AddItemForm addItem={addTask} />
            <div>
                <Button variant={'contained'} color={todolist.filter === 'All' ? 'primary' : 'inherit'} size={'small'}
                        onClick={() => filterTasks('All')}>All</Button>
                <Button variant={'contained'} color={todolist.filter === 'Active' ? 'primary' : 'inherit'}
                        size={'small'}
                        onClick={() => filterTasks('Active')} style={{margin: '0px 5px'}}>Active</Button>
                <Button variant={'contained'} color={todolist.filter === 'Completed' ? 'primary' : 'inherit'}
                        size={'small'} onClick={() => filterTasks('Completed')}>Completed</Button>
            </div>
            <List>
                {tasks.map(mf => <Task key={mf.id} taskId={mf.id} todolistId={todolistId}/>)}
            </List>
        </div>
    )
} )