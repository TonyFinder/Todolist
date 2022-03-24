import React, {useCallback} from 'react';
import {changeCheckboxAC, changedTitleTaskAC, removeTaskAC} from '../../core/reducer-tasks';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteTwoTone} from '@material-ui/icons';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateRootType} from '../../core/store/store';
import {TaskStatuses, TaskType} from '../../api/api';

type TaskPropsType = {
    id: string
    todolistId: string
}

export const Task = React.memo( ({id, todolistId}: TaskPropsType) => {
    // console.log("Task")
    const task = useSelector<AppStateRootType, TaskType>(state => state.tasks[todolistId].filter(f => f.id === id)[0])
    const dispatch = useDispatch()

    const changedTitleTask = useCallback( (title: string) => dispatch(changedTitleTaskAC(title, todolistId, task.id)), [dispatch, todolistId, task.id])
    const changeTaskCheckbox = useCallback( (id: string, event: boolean) => dispatch(changeCheckboxAC(id, event ? TaskStatuses.Completed : TaskStatuses.New, todolistId)), [dispatch, todolistId])
    const removeTask = useCallback( (id: string) => dispatch(removeTaskAC(id, todolistId)), [dispatch, todolistId])

    return (
        <ListItem style={{padding: '0px'}}>
            <IconButton onClick={() => removeTask(task.id)} size={'small'}>
                <DeleteTwoTone color={'secondary'}/>
            </IconButton>
            <Checkbox size={'small'} color={'primary'}
                      onChange={(event) => changeTaskCheckbox(task.id, event.currentTarget.checked)} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan titleMain={task.title} changedTitle={changedTitleTask} completed={task.status === TaskStatuses.Completed}
                          header={false}/>
        </ListItem>
    )
} )