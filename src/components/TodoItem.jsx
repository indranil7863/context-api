import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoItem({todo}) {
    console.log("this is todo: ", todo)

    const { toggleComplete, updateTodo, deleteTodo } = useTodo();
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const [isTodoEditable, setIsTodoEditable] = useState(false)

    const savetheChange = () =>{
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }
  return (
    <div>
        <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={toggleCompleted}
         />
         <input 
         type="text"
         value={todoMsg} 
         onChange={(e) => setTodoMsg(e.target.value)}
         readOnly={!isTodoEditable}
          />
          <button
            onClick={() =>{
                if(todo.completed)return;
                if(isTodoEditable){
                    savetheChange();
                }else{
                    setIsTodoEditable((prev) => !prev)
                }
            
            }}
            disabled = {todo.completed}
          >
            {isTodoEditable ? "✅" : "📝"}
          </button>
          {/* Delete Todo button */}
          <button
          onClick={() => deleteTodo(todo.id)}
         >
            🗑️
          </button>
    </div>
  )
}

export default TodoItem