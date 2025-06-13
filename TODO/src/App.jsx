import { useState, useEffect } from 'react'
import Navbar from './component/navbar'

function App() {


  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 my-5  mx-auto min-h-[80vh] max-w-[75%]">
        <div className="">
          <h1 className="font-bold text-center">Manage Your Task List</h1>
        </div>
      </div>
    </>
  )
}

export default App
