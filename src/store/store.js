import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk";
const generalReducer = combineReducers({

})


export const store = createStore(generalReducer, applyMiddleware(thunk, logger))