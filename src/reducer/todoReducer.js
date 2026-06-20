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

        default: {
            return stateTodo;
        }
    }
}


