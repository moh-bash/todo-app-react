import { v4 as uuidv4 } from "uuid";

export default function todoReducer(stateTodo, action) {
    const type = action.type;
    switch (type) {
        case "added": {
            const newData = [
                ...stateTodo,
                {
                    id: uuidv4(),
                    title: action.payload.title,
                    description: action.payload.description,
                    isCompleted: false,
                },
            ];
            localStorage.setItem("tasks", JSON.stringify(newData));
            return newData;
        }

        case "deleted": {
            const updatedDataBeforeDelete = stateTodo.filter((t) => t.id !== action.payload.task.id);
            localStorage.setItem("tasks", JSON.stringify(updatedDataBeforeDelete));
            return updatedDataBeforeDelete;
        }

        case "updated": {
            const updatedData = stateTodo.map((t) => {
                if (t.id === action.payload.task.id) {
                    return {
                        ...t,
                        title: action.payload.newTask.title,
                        description: action.payload.newTask.description,
                    };
                }
                return t;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedData));
            return updatedData;
        }

        case "lododLocal": {
            const storedData = localStorage.getItem("tasks");
            if (storedData) {
                const dataLocal = JSON.parse(storedData);
                return dataLocal;
            }
            return stateTodo;
        }

        default: {
            return stateTodo;
        }
    }
}


