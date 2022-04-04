import React, {useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from '../reducer-tasks';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteTwoTone} from '@material-ui/icons';
import {EditableSpan} from '../../Components/EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateRootType} from '../../app/store';
import {TaskStatuses, TaskType} from '../../api/api';

type TaskPropsType = {
    id: string
    todolistId: string
}

export const Task = React.memo( ({id, todolistId}: TaskPropsType) => {
    console.log("Task")

    const task = useSelector<AppStateRootType, TaskType>(state => state.tasks[todolistId].filter(f => f.id === id)[0])
    const dispatch = useDispatch()

    const changeTaskTitle = useCallback( (title: string) => dispatch(updateTaskTC(todolistId, task.id, {title})), [dispatch, todolistId, task.id])
    const changeTaskCheckbox = useCallback( (taskId: string, event: boolean) => dispatch(updateTaskTC(todolistId, taskId, event ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New})), [dispatch, todolistId])
    const removeTask = useCallback( (taskId: string) => dispatch(removeTaskTC(taskId, todolistId)), [dispatch, todolistId])

    return (
        <ListItem style={{padding: '0px'}}>
            <IconButton onClick={() => removeTask(task.id)} size={'small'}>
                <DeleteTwoTone color={'secondary'}/>
            </IconButton>
            <Checkbox size={'small'} color={'primary'}
                      onChange={(event) => changeTaskCheckbox(task.id, event.currentTarget.checked)} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan titleMain={task.title} changedTitle={changeTaskTitle} completed={task.status === TaskStatuses.Completed}
                          header={false}/>
        </ListItem>
    )
} )