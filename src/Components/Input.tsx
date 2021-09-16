import React, {ChangeEvent, KeyboardEvent} from 'react';
import style from './Input.module.css'

type InputPropsType = {
    inputTextValue: string
    setInputTextValue: (inputTextValue: string) => void
    callback: () => void
    setError: (error: boolean) => void
    error: boolean
}

export const Input = (props: InputPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputTextValue(event.currentTarget.value)
        props.setError(false)

    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') props.callback()
    }

    return (
        <input className={props.error ? style.borderInput : ''} value={props.inputTextValue} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
    )
}