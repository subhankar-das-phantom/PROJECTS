import { useState, useEffect } from 'react'
import Navbar from './component/navbar'

function App() {


  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 my-5  mx-auto min-h-[80vh] max-w-[75%]">
          <h1 className="font-bold text-center text-3xl ">Manage Your Task List</h1>
          <div className="addtodo">
            <h1 className="font-bold mx-9 my-2 text-2xl">Make a todo</h1>
            <input type="text" className='bg-white mx-5' />
            <button>Save</button>
          </div>
        </div>

    </>
  )
}

export default App
