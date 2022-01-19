import React, {ChangeEvent, useCallback} from 'react';
import {changeCheckboxAC, changedTitleTaskAC, removeTaskAC} from '../../core/reducer-tasks';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteTwoTone} from '@material-ui/icons';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {taskPropsType} from '../../App';
import {AppStateRootType} from '../../core/store/store';

type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const Task = React.memo( ({todolistId, taskId}: TaskPropsType) => {
    console.log("Task")
    const task = useSelector<AppStateRootType, taskPropsType>(state => state.tasks[todolistId].filter(f => f.id === taskId)[0])
    const dispatch = useDispatch()

    const changedTitleTask = useCallback( (title: string) => dispatch(changedTitleTaskAC(title, todolistId, task.id)), [dispatch, todolistId, task.id])
    const changeTaskCheckbox = useCallback( (id: string, event: ChangeEvent<HTMLInputElement>) => dispatch(changeCheckboxAC(id, event.currentTarget.checked, todolistId)), [dispatch, todolistId])
    const removeTask = useCallback( (id: string) => dispatch(removeTaskAC(id, todolistId)), [dispatch, todolistId])

    return (
        <ListItem style={{padding: '0px'}}>
            <IconButton onClick={() => removeTask(task.id)} size={'small'}>
                <DeleteTwoTone color={'secondary'}/>
            </IconButton>
            <Checkbox size={'small'} color={'primary'}
                      onChange={(event) => changeTaskCheckbox(task.id, event)} checked={task.isDone}/>
            <EditableSpan titleMain={task.term} changedTitle={changedTitleTask} completed={task.isDone}
                          header={false}/>
        </ListItem>
    )
} )