import React, {ChangeEvent, useCallback} from 'react';
import {changeCheckboxAC, changedTitleTaskAC, removeTaskAC} from '../../core/reducer-tasks';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {DeleteTwoTone} from '@material-ui/icons';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {taskPropsType} from '../../App';

type TaskPropsType = {
    todolistId: string
    task: taskPropsType
}

export const Task = React.memo( (props: TaskPropsType) => {
    console.log("Task")
    const dispatch = useDispatch()

    const changedTitleTask = useCallback( (title: string) => dispatch(changedTitleTaskAC(title, props.todolistId, props.task.id)), [dispatch, props.todolistId, props.task.id])
    const changeTaskCheckbox = useCallback( (id: string, event: ChangeEvent<HTMLInputElement>) => dispatch(changeCheckboxAC(id, event.currentTarget.checked, props.todolistId)), [dispatch, props.todolistId])
    const removeTask = useCallback( (id: string) => dispatch(removeTaskAC(id, props.todolistId)), [dispatch, props.todolistId])

    return (
        <ListItem style={{padding: '0px'}}>
            <IconButton onClick={() => removeTask(props.task.id)} size={'small'}>
                <DeleteTwoTone color={'secondary'}/>
            </IconButton>
            <Checkbox size={'small'} color={'primary'}
                      onChange={(event) => changeTaskCheckbox(props.task.id, event)} checked={props.task.isDone}/>
            <EditableSpan title={props.task.term} changedTitle={changedTitleTask} completed={props.task.isDone}
                          header={false}/>
        </ListItem>
    )
} )