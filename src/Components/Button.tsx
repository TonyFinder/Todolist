import { FilterProps } from '../App'
import styles from './Button.module.css'

type ButtonType = {
    title: string
    callback: () => void
    filter: FilterProps
}

export const Button = (props: ButtonType) => {
    const buttonClickHandler = () => props.callback()

    return (
        <button className={props.filter === props.title ? styles.color : ''} onClick={buttonClickHandler}>{props.title}</button>
    )
}