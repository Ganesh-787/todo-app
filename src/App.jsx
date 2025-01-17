import React, { useContext } from "react";
import { Context } from "./Context";

export default function App() {
  const { input, setInput, todos, handleAdd, handleDelete } =
    useContext(Context);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl ">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6 drop-shadow-md">
          To-Do App
        </h1>

        {/* Input Field */}
        <form className="flex items-center gap-2 mb-6" onSubmit={handleAdd}>
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-shadow shadow-sm"
            placeholder="Add a new task"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-purple-500 transition-transform transform hover:scale-110">
            Add
          </button>
        </form>

        {/* Task List */}
        {todos.length > 0 ? (
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center gap-10 px-4 py-3 rounded-lg shadow-md bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-colors"
              >
                <input type="checkbox" />
                <span className="cursor-pointer text-gray-800 hover:text-purple-600 transition">
                  {todo}
                </span>
                <button
                  className="text-red-500 hover:text-red-600 transform transition-transform hover:scale-110 ml-auto"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-700 mt-6 animate-pulse">
            No tasks yet. Start adding some!
          </p>
        )}
      </div>
    </div>
  );
}
