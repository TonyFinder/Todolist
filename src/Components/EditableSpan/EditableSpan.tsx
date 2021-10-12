import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField, Typography} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    completed: boolean
    changedTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [title, setTitle] = useState(props.title)
    let [inputActive, setInputActive] = useState(false)

    const inputActiveOn = () => {
        setInputActive(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const titleForToDolist = () => {
        setInputActive(false)
        props.changedTitle(title)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') titleForToDolist()
    }

    const opacityForTasks = props.completed ? {opacity: 0.35} : {opacity: ""}

    return (
        <div>
            {inputActive
                ? <TextField
                    value={title}
                    onChange={onChangeHandler}
                    onBlur={titleForToDolist}
                    onKeyPress={onKeyPressHandler}
                    autoFocus/>
                : <Typography onDoubleClick={inputActiveOn} style={opacityForTasks}>
                    {props.title}
                </Typography>
            }

        </div>
    )
}