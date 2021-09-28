import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import style from './EditableSpan.module.css'

type EditableSpanPropsType = {
    title: string
    completed: boolean
    changedTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [title, setTitle] = useState(props.title)
    let [inputActive, setInputActive] = useState(false)

    const completedTaskHandler = props.completed ? style.completedTasks : ''
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
        if (e.key === "Enter") titleForToDolist()
    }

    return (
        <div>
            {inputActive
                ? <input
                    value={title}
                    onChange={onChangeHandler}
                    onBlur={titleForToDolist}
                    onKeyPress={onKeyPressHandler}
                    autoFocus/>
                : <span
                    className={completedTaskHandler}
                    onDoubleClick={inputActiveOn}
                >{props.title}</span>
            }

        </div>
    )
}