import { createStore } from "../../node_modules/redux/es/redux.js";
import { reducer } from "./reducer.js";
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());