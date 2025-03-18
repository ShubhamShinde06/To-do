import React, { useEffect, useRef, useState } from "react";
import {
  MdDeleteOutline,
  MdDone,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

  const inputRef = useRef();

  const addTodo = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
        return prvTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggleTodo = (id) => {
    setTodoList((prevTodo) => {
        return prevTodo.map((todo) => {
            if(todo.id === id){
                return {
                    ...todo,
                    isComplete: !todo.isComplete
                }
            }
            return todo
        })
    })
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
  },[todoList])

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="title flex items-center mt-7 gap-2">
        <span className="text-[30px]">
          <MdOutlineCalendarToday />
        </span>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="input-box flex items-center my-7 bg-gray-200 rounded-full">
        <input
          type="text"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          placeholder="Add your task"
          ref={inputRef}
        />
        <button
          onClick={addTodo}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg- font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {todoList.map((item, index) => (
        <>
          <div key={index + 1} className="todo-list flex items-center my-3 gap-2">
            <div onClick={()=>{toggleTodo(item.id)}} className={` flex flex-1 itmes-center cursor-pointer gap-2 ${item.isComplete === true ? 'line-through' : ''}`}>
              <span className="w-5 h-5 rounded-full text-black flex items-center justify-center mt-1">
                { item.isComplete ? <MdDone className="bg-orange-400 rounded-full text-white w-5 h-5 font-bold" /> : <RiCheckboxBlankCircleLine />}
              </span>
              <p className="text-slate-700 text-[17px]">{item.text}</p>
            </div>

            <span className="text-[20px] cursor-pointer" onClick={()=>{deleteTodo(item.id)}}>
              <MdDeleteOutline />
            </span>
          </div>
        </>
      ))}
    </div>
  );
};

export default Todo;
