import React, { useContext } from "react";
import { Context } from "./Context";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function App() {
  const {
    input,
    setInput,
    todos,
    handleAdd,
    handleDelete,
    toggleSelected,
    showSelected,
    setShowSelected,
    handleEdit,
    inputRef
  } = useContext(Context);

  const filteredTodos = showSelected
    ? todos.filter((item) => item.completed)
    : todos;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 ml-3">Taskify</h1>
        </div>

        {/* Input Field */}
        <form className="flex items-center gap-2 mb-6" onSubmit={handleAdd}>
          <input
            type="text"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Add a new task"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            ref={inputRef}
          />
          <button className="px-5 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition">
            Add
          </button>
        </form>

        {todos.length > 0 && (
          <label className="flex items-center gap-2 mb-6 text-gray-600 font-medium">
            <input
              type="checkbox"
              checked={showSelected}
              onChange={(e) => setShowSelected(e.target.checked)}
              className="accent-teal-500 h-5 w-5"
            />
            Show Completed Tasks
          </label>
        )}

        {/* Task List */}
        {filteredTodos.length > 0 ? (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
            {filteredTodos.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 px-4 py-3 rounded-md bg-gray-50 border border-gray-200 hover:shadow-md transition"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleSelected(index)}
                  className="h-5 w-5 accent-teal-500 cursor-pointer"
                />
                <span
                  className={`flex-grow ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {item.todo}
                </span>
                <button
                  className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  onClick={() => handleEdit(index)}
                  
                >
                  <EditIcon />
                </button>
                <button
                  className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 bg-gray-50 px-4 py-3 rounded-md mt-6">
            {showSelected
              ? "No completed tasks yet. Mark some as done!"
              : "No tasks yet. Start by adding one above."}
          </p>
        )}
      </div>
    </div>
  );
}
