import { createContext, useReducer } from "react";
import { todoReducer } from "./reducer";

const DataContext = createContext([]);
const todoProvider =(children)=>{
    const [Data, dispatch] = useReducer(todoReducer, []);
    return (
        <DataContext.Provider value={{ Data, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, todoProvider };

