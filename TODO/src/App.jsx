import { useState, useEffect } from "react";
import Navbar from "./component/navbar";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todos=JSON.parse(localStorage.getItem("todos"));
    setTodos(todos)
  }, [])
  

  const saveToLS= (params) => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleFinished=(params) => { 
    setshowFinished(!showFinished)

   }

  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()

  };

  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 my-5  mx-auto min-h-[80vh] max-w-[75%] px-3.5">
        <h1 className="font-bold text-center text-xl ">
          Manage Your Task List
        </h1>
        <div className="addtodo">
          <h1 className="font-bold mx-2 my-2 text-lg">Make a todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white mx-2 w-3/4 p-2 rounded-full"
          />
          <button
            onClick={handleSave} disabled={todo.length<=3}
            className="bg-blue-700 disabled:bg-blue-400 hover:bg-blue-900 rounded-xl py-1 px-2 text-white"
          >
            Save
          </button>
        </div>
        <input type="checkbox" onClick={toggleFinished} checked={showFinished}/> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="mx-5 my-2">No Todos To Display.</div>
          )}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) &&
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
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-blue-700 hover:bg-blue-900 rounded-xl py-1 px-2 text-white mx-1"
                  >
                   <AiOutlineEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-blue-700 hover:bg-blue-900 rounded-xl py-1 px-2 text-white mx-1"
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  );
}

export default App;
