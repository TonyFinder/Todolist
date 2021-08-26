import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterProps = 'All' | 'Active' | 'Completed'

function App() {

    let [task1, setTask] = useState([
            {id: 1, term: 'HTML&CSS', isDone: true},
            {id: 2, term: 'JS', isDone: true},
            {id: 3, term: 'React', isDone: false},
            {id: 4, term: 'HTML&CSS', isDone: true},
            {id: 5, term: 'JS', isDone: true},
            {id: 6, term: 'React', isDone: false}
        ]
    )

    const removeTask = (taskID: number) => {
        let removeTask1 = task1.filter(ft => ft.id !== taskID)
        setTask(removeTask1)
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
            />
        </div>
    );
}

export default App;
