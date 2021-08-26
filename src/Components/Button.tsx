import {FilterProps} from '../App'

type ButtonType = {
    filterTask: (filterId: FilterProps) => void
    buttonValue: FilterProps
}

export const Button = (p: ButtonType) => <button onClick={() => p.filterTask(p.buttonValue)}>{p.buttonValue}</button>