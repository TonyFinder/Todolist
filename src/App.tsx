import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './Todolist';

export type FilterProps = 'All' | 'Active' | 'Completed'

function App() {

    let [task1, setTask] = useState([
            {id: v1(), term: 'HTML&CSS', isDone: true},
            {id: v1(), term: 'JS', isDone: true},
            {id: v1(), term: 'React', isDone: false},
            {id: v1(), term: 'HTML&CSS', isDone: true},
            {id: v1(), term: 'JS', isDone: true},
            {id: v1(), term: 'React', isDone: false}
        ]
    )

    const removeTask = (taskID: string) => {
        let removeTask1 = task1.filter(ft => ft.id !== taskID)
        setTask(removeTask1)
    }

    const addTask = (title: string) => {
        let newTask = [{id: v1(), term: title, isDone: false},...task1]
        setTask(newTask)
    }

    let [filter, setFilter] = useState<FilterProps>('All')

    const filterTask = (filterId: FilterProps) => {
        setFilter(filterId)
    }

    let sito = task1
    if (filter === 'Completed') {
        sito = task1.filter(f => f.isDone)
    }
    if (filter === 'Active') {
        sito = task1.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                task={sito}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
