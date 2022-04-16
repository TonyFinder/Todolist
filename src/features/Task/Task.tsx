import React, {useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from '../reducer-tasks';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {useCustomSelector} from '../../app/store';
import {TaskType} from '../../api/api';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../utils/enums';


type TaskPropsType = {
    id: string
    todolistId: string
}

export const Task = React.memo( ({id, todolistId}: TaskPropsType) => {
    console.log("Task")

    const task = useCustomSelector<TaskType>(state => state.tasks[todolistId].filter(f => f.id === id)[0])
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