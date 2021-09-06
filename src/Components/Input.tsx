import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    inputTextValue: string
    setInputTextValue: (inputTextValue: string) => void
    callback: () => void
}

export const Input = (props: InputPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.setInputTextValue(event.currentTarget.value)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') props.callback()
    }

    return (
        <input value={props.inputTextValue} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
    )
}