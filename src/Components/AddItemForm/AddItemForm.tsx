import React, {useCallback, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircleTwoTone} from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (inputTextValue: string) => void
}

export const AddItemForm = React.memo( ({addItem}: AddItemFormPropsType) => {
    console.log("AddItemForm")
    //Хуки React
    let [inputTextValue, setInputTextValue] = useState('')
    let [error, setError] = useState(false)

    const onChangeHandler = useCallback( (value: string) => {
        setInputTextValue(value)
        setError(false)
    }, [])

    const onClickPressHandler = useCallback( (code: string) => {
        if (code === "Enter" || code === "NumpadEnter") {
            if (inputTextValue.trim() !== '') {
                addItem(inputTextValue)
                setInputTextValue('')
            } else {
                setError(true)
            }
        }
    }, [inputTextValue, addItem])

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
} )