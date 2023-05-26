import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    if(storageTodos.length>0){
      setTodos(storageTodos);
    }   
  },[])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

  function addTodo(text){
    setTodos([...todos,text]);
  }

  function removeTodo(index){
    setTodos(todos.filter((todos, i) => i !== index));
  }

  function updateTodo(index,text){
    const newTodos = [...todos];
    newTodos[index] = text;
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>TODO List</h1>
      <form onSubmit={(e)=>{
        e.preventDefault();
        addTodo(e.target.elements.todo.value);
        e.target.elements.todo.value='';
      }}>
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo,index)=> (
          <li key={index}>
            <input type="text" value={todo} onChange={(e)=>updateTodo(index,e.target.value)} />
            <button onClick={()=>removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
