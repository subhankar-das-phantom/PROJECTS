import { useState, useEffect } from "react";
import Navbar from "./component/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleEdit =(e, id) => {
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
        let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);


  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 my-5  mx-auto min-h-[80vh] max-w-[75%] px-3.5">
        <h1 className="font-bold text-center text-3xl ">
          Manage Your Task List
        </h1>
        <div className="addtodo">
          <h1 className="font-bold mx-2 my-2 text-2xl">Make a todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white mx-2 w-3/4 p-1"
          />
          <button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-900 rounded-xl py-1 px-2 text-white"
          >
            Save
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="mx-5 my-2">No Todos To Display.</div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex my-3 w-3/4 justify-between"
              >
                <div className="flex gap-5">
                  {" "}
                  <input
                    onChange={handleCheckbox}
                    name={item.id}
                    type="checkbox"
                    value={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-blue-700 hover:bg-blue-900 rounded-xl py-1 px-2 text-white mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-blue-700 hover:bg-blue-900 rounded-xl py-1 px-2 text-white mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
