import { createContext, useEffect, useRef, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTodosString = localStorage.getItem("todos");
    if (storedTodosString) {
      try {
        const savedTodos = JSON.parse(storedTodosString);
        setTodos(savedTodos);
      } catch (error) {
        console.error("Error fetching todos:",error);
        setTodos([]);
      }
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter something!");
      return 0;
    }
    const newTodos = { todo: input, completed: false };
    setTodos([...todos, newTodos]);
    setInput("");
    saveToLS(newTodos);
  };

  const handleDelete = (indexToDelete) => {
    const newTodos = todos.filter((_, i) => i !== indexToDelete);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleSelected = (indexToToggle) => {
    const newTodos = todos.map((item, i) =>
      i === indexToToggle ? { ...item, completed: !item.completed } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (indexToEdit) => {
    const editableTasks = todos.filter((_, i) => i === indexToEdit);
    setInput(editableTasks[0].todo);
    const newTodos = todos.filter((_, i) => i !== indexToEdit);
    setTodos(newTodos);

    setTimeout(() => {
      inputRef.current?.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }, 0);
    saveToLS(newTodos);
  };

  const contextValue = {
    input,
    setInput,
    todos,
    handleAdd,
    handleDelete,
    handleEdit,
    toggleSelected,
    showSelected,
    setShowSelected,
    inputRef,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
