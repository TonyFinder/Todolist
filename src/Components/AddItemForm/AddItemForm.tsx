import React, {useState} from 'react';
import {FilterProps} from '../../App';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircleTwoTone} from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (inputTextValue: string) => void
    filter: FilterProps
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    //Хуки React
    let [inputTextValue, setInputTextValue] = useState('')
    let [error, setError] = useState(false)

    const onChangeHandler = (value: string) => {
        setInputTextValue(value)
        setError(false)
    }

    const onClickPressHandler = (code: string) => {
        if (code === "Enter" || code === "NumpadEnter") {
            if (inputTextValue.trim() !== '') {
                props.addItem(inputTextValue)
                setInputTextValue('')
            } else {
                setError(true)
            }
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={inputTextValue}
                onChange={(e) => onChangeHandler(e.currentTarget.value)}
                onKeyPress={(e) => onClickPressHandler(e.code)}
                label={'Title'}
                error={error}
                helperText={error && "Title is a must"}
                style={{marginBottom: "10px"}}
                />
            <IconButton color={'primary'} onClick={() => onClickPressHandler("Enter")}>
                <AddCircleTwoTone/>
            </IconButton>
        </div>
    )
}