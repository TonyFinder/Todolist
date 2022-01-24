import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField, Typography} from '@material-ui/core';

type EditableSpanPropsType = {
    titleMain: string
    completed: boolean
    changedTitle: (title: string) => void
    header: boolean
}

export const EditableSpan = React.memo( ({header, completed, changedTitle, titleMain}: EditableSpanPropsType) => {
    // console.log("EditableSpan")
    //Хуки React
    let [title, setTitle] = useState(titleMain)
    let [inputActive, setInputActive] = useState(false)

    const inputActiveOn = useCallback( () => setInputActive(true), [])
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])
    const titleForToDolist = useCallback( () => {
        setInputActive(false)
        changedTitle(title)
    }, [changedTitle, title])
    const onKeyPressHandler = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') titleForToDolist()
    }, [titleForToDolist])

    const opacityAndBoldForTasks: any = header
        ? {fontWeight: 'bold', fontSize: 'larger'}
        : (completed ? {opacity: 0.35} : {opacity: 1})


    return (
        <div>
            {inputActive
                ? <TextField
                    value={title}
                    onChange={onChangeHandler}
                    onBlur={titleForToDolist}
                    onKeyPress={onKeyPressHandler}
                    autoFocus
                />
                : <Typography onDoubleClick={inputActiveOn} style={opacityAndBoldForTasks}>
                    {titleMain}
                </Typography>
            }

        </div>
    )
} )