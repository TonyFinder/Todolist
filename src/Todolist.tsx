import {Button, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {FilterProps, taskPropsType, todolistsPropsType} from './App';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import {DeleteForeverTwoTone, DeleteTwoTone} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateRootType} from './core/store/store';
import {addTaskAC, changeCheckboxAC, changedTitleTaskAC, removeTaskAC} from './core/reducer-tasks';
import {changeTodolistTitleAC, filterTaskAC, removeTodolistAC} from './core/reducer-todolist';

type TodolistPropsType = {todolistId: string}

export const Todolist = (props: TodolistPropsType) => {
    //Хуки react-redux
    let dispatch = useDispatch()
    let todolist = useSelector<AppStateRootType, todolistsPropsType>(state => state.todolists.filter(f => f.id === props.todolistId)[0])
    let tasks = useSelector<AppStateRootType, taskPropsType[]>(state => state.tasks[props.todolistId])

    //Фильтрация тасков
    todolist.filter === 'Active'
        ? tasks = tasks.filter(f => !f.isDone)
        :
        todolist.filter === 'Completed'
            ? tasks = tasks.filter(f => f.isDone)
            : tasks = [...tasks]

    //Работа с тасками
    const addTask = (title: string) => dispatch(addTaskAC(title, props.todolistId))
    const changeTaskCheckbox = (id: string, event: ChangeEvent<HTMLInputElement>) => dispatch(changeCheckboxAC(id, event.currentTarget.checked, props.todolistId))
    const filterTasks = (filter: FilterProps) => dispatch(filterTaskAC(filter, props.todolistId))
    const removeTask = (id: string) => dispatch(removeTaskAC(id, props.todolistId))

    // Работа с тудулистами
    const removeTodolist = () => dispatch(removeTodolistAC(props.todolistId))
    const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC(title, props.todolistId))

    return (
        <div>
            <IconButton onClick={removeTodolist}>
                <DeleteForeverTwoTone color={'secondary'}/>
            </IconButton>
            <h3><EditableSpan changedTitle={changeTodolistTitle} title={todolist.title} completed={false}
                              header={true}/></h3>
            <AddItemForm addItem={addTask} filter={todolist.filter}/>
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
                {tasks.map(mf => {
                        const changedTitleTask = (title: string) => {
                            dispatch(changedTitleTaskAC(title, props.todolistId, mf.id))
                        }

                        return (
                            <ListItem key={mf.id} style={{padding: '0px'}}>
                                <IconButton onClick={() => removeTask(mf.id)} size={'small'}>
                                    <DeleteTwoTone color={'secondary'}/>
                                </IconButton>
                                <Checkbox size={'small'} color={'primary'}
                                          onChange={(event) => changeTaskCheckbox(mf.id, event)} checked={mf.isDone}/>
                                <EditableSpan title={mf.term} changedTitle={changedTitleTask} completed={mf.isDone}
                                              header={false}/>
                            </ListItem>
                        )
                    }
                )
                }
            </List>
        </div>
    )
}