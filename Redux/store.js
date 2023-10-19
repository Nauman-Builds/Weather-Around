import { createStore } from "redux";
import { ApiReducer } from "./reducers";
import { combineReducers } from "redux";

const routeReducer = combineReducers({ApiReducer})

export const store = createStore(routeReducer);