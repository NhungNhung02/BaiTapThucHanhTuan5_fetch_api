import { useEffect, useRef, useState } from "react";

function TodoList(props) {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState([])
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/todos"
    async function fetchDataFromUrl(url) {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
      console.log(data);
    }
    fetchDataFromUrl(url)
  }, [])


  const handleChange = (e) => {
    console.log(e.target.value);
    setTodoValue(e.target.value)
    inputRef.current = e.target.value
  }

  const handleAddTodo = async () => {
    // Disable nút khi đang submit
    buttonRef.current.disabled = true;
    console.log("inputRef.current.value", inputRef.current);


    const payload = {
      method: "POST",
      body: JSON.stringify({
        title: inputRef.current,
        completed: false,
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }
    try {
      const url = "https://jsonplaceholder.typicode.com/todos"
      const response = await fetch(
        url,
        payload
      );
      const data = await response.json();

      console.log("handleAddTodo", data);

      setTodos([data, ...todos]);
      buttonRef.current.disabled = false;
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleDelete = async (todoId) => {
    try {
      const url = "https://jsonplaceholder.typicode.com/todos/" + todoId
      const response = await fetch(
        url,
        {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        });
      if (response.ok) {
        const newData = todos.filter(item => item.id != parseInt(todoId))
        setTodos(newData);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <>
      <div style={{ position: "fixed", top: 0, width: "100%" }}>
        <input ref={inputRef} type="text" placeholder='Enter your todo..' onChange={handleChange} value={todoValue} />
        <button ref={buttonRef} onClick={(e) => handleAddTodo()}>ADD</button>
      </div>
      <h1>Todo List</h1>
      <ul>
        {
          todos.map(todo => {
            return <li key={todo.id}>{todo.title}
              <span style={{ display: "inline-block", padding: 10, cursor: "pointer" }} onClick={(e) => handleDelete(todo.id)}>&times;</span>
            </li>
          })
        }
      </ul>
    </>
  )
}

export default TodoList;
