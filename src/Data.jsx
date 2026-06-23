import { createContext, useReducer, useContext } from "react";
import todoReducer from "./reducer/todoReducer";

const DataContext = createContext([]);

export const TodoProvider = ({ children }) => {
    const [Data, dispatch] = useReducer(todoReducer, []);
    return (
        <DataContext.Provider value={{ Data, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(DataContext);
};

