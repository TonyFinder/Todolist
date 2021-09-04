type ButtonType = {
    title: string
    callback: () => void
}

export const Button = (props: ButtonType) => {
    const buttonClickHandler = () => props.callback()

    return (
        <button onClick={buttonClickHandler}>{props.title}</button>
    )
}