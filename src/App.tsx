import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const task1 = [
        {id: 0, term: 'HTML&CSS', isDone: true},
        {id: 1, term: 'JS', isDone: true},
        {id: 2, term: 'React', isDone: false}
    ]

    const task2 = [
        {id: 0, term: 'Terminator', isDone: false},
        {id: 1, term: 'Boys in Black', isDone: true},
        {id: 2, term: 'Lucky Man', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" task={task1}/>
            <Todolist title="Movies" task={task2}/>
        </div>
    );
}

export default App;
