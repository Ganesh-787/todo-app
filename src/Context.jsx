import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAdd =  (e) => {
        e.preventDefault();
        if (input.trim() === "") {
            alert("Please enter something!");
            return 0;
        }
        setTodos([...todos,input]);
        setInput("");
    }

    const handleDelete = (indexToDelete) => {
        const newTodos = todos.filter((_, i)=> i!== indexToDelete);
        setTodos(newTodos);
    }

    const contextValue = {
        input,
        setInput,
        todos,
        handleAdd,
        handleDelete
    }

    return (<Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>)

}

export default ContextProvider;