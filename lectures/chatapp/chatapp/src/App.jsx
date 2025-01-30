import { useState } from 'react'
import './App.css'
import create from'./create'


function App() {
  const [todos, setTodos] = useState([])
  return (
   <div>
    <h2>ToDo List</h2>
    <input type="text" placeholder="Enter a task" name="" id="" />
    <button type='button'>New</button>
    {
      todos.length === 0 ?
      <div>
        <h2>No Record</h2>
        </div>
      :
      todos.map(todo => (
        <div>
          {todo}
          </div>
      ))
    }

   </div>
  )
}

export default App
