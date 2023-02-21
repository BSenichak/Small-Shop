import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk";
import headerReducer from "./header/headerReducer";
import homeReducer from "./home/homeReducer";
import posterReducer from "./home/poster/posterReducer";
const generalReducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    poster: posterReducer,
})


export const store = createStore(generalReducer, applyMiddleware(thunk, logger))