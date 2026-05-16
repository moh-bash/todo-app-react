import { v4 as uuidv4 } from "uuid";

export default function todoReducer(state, action) {
    switch (action.type) {
        case "added": {

           return console.log(action.payload);

        }
        default: {
            console.log(action.type);
        }
    }
}
