import React from 'react';

type TaskPropsType = {
    id: number
    term: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: TaskPropsType[]
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>
            <ul>
                <li><input type="checkbox" checked={props.task[0].isDone}/><span>{props.task[0].term}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone}/><span>{props.task[1].term}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone}/><span>{props.task[2].term}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}