
import './App.css'
import { useTodo } from './contexts'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'
import { useEffect, useState } from 'react'


function App() {

  const [todos, setTodos] = useState([])
 
  const addTodo = (todo) =>{
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) =>{
    setTodos((prev) => prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev) => {
      return prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo)
    })
  }
  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  console.log(todos);
  
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div>
        <div>
          <h1>Manage Your Todo</h1>
          <div>
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
        </div>
        <div>
          {/* Loop and add todo Item here */}
          {todos.map((todo)=>{
              return <div key={todo.id}>
                
                <TodoItem todo={todo} />
              </div>
          })}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
