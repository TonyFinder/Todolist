import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {useCustomSelector} from '../../../app/store';
import {addTaskTC, setTasksTC} from '../../reducer-tasks';
import {
    changeTodolistTitleTC,
    FilterProps,
    filterTaskAC,
    removeTodolistTC,
    TodolistStateType
} from '../../reducer-todolist';
import {Task} from '../../Task/Task';
import {TaskType} from '../../../api/api';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DeleteForeverTwoTone from '@mui/icons-material/DeleteForeverTwoTone';
import {TaskStatuses} from '../../../utils/enums';


type TodolistPropsType = {todolistId: string}

export const Todolist = React.memo( ({todolistId}: TodolistPropsType) => {
    console.log("Todolist")

    useEffect(()=>{
        dispatch(setTasksTC(todolistId))
        // eslint-disable-next-line
    },[])

    let dispatch = useDispatch()
    let todolist = useCustomSelector<TodolistStateType>(state => state.todolists.filter(f => f.id === todolistId)[0])
    let tasks = useCustomSelector<TaskType[]>(state => state.tasks[todolistId])

    //Фильтрация тасков
    todolist.filter === 'Active'
        ? tasks = tasks.filter(f => !(f.status === TaskStatuses.Completed))
        :
        todolist.filter === 'Completed'
            ? tasks = tasks.filter(f => f.status === TaskStatuses.Completed)
            : tasks = [...tasks]

    //Работа с тасками
    const addTask = useCallback( (title: string) => dispatch(addTaskTC(title, todolistId)), [dispatch, todolistId])
    const filterTasks = useCallback( (filter: FilterProps) => dispatch(filterTaskAC(filter, todolistId)), [dispatch, todolistId])

    // Работа с тудулистами
    const removeTodolist = useCallback( () => dispatch(removeTodolistTC(todolistId)), [dispatch, todolistId])
    const changeTodolistTitle = useCallback( (title: string) => dispatch(changeTodolistTitleTC(title, todolistId)), [dispatch, todolistId])

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
                {tasks.map(mf => <Task key={mf.id} id={mf.id} todolistId={todolistId}/>)}
            </List>
        </div>
    )
} )