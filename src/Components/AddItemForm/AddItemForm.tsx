import React, { useState } from 'react';
import { FilterProps } from '../../App';
import { Button } from '../Button';
import { Input } from '../Input';
import style from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    addItem: (inputTextValue: string) => void
    filter: FilterProps
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [inputTextValue, setInputTextValue] = useState('')
    let [error, setError] = useState(false)

    const onClickPressHandler = () => {
        if (inputTextValue.trim() !== '') {
            props.addItem(inputTextValue)
            setInputTextValue('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <Input inputTextValue={inputTextValue} setInputTextValue={setInputTextValue}
                   callback={onClickPressHandler} setError={setError} error={error}/>
            <Button title={'+'} callback={onClickPressHandler} filter={props.filter}/>
            {error && <div className={style.redText}>Title is required</div>}
        </div>
    )
}