import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"
import thunk from "redux-thunk";
import categoryReducer from "./category/categoryReducer";
import headerReducer from "./header/headerReducer";
import categoriesReducer from "./home/categories/categoriesReducer";
import homeReducer from "./home/homeReducer";
import posterReducer from "./home/poster/posterReducer";
const generalReducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    poster: posterReducer,
    categories: categoriesReducer,
    category: categoryReducer
})


export const store = createStore(generalReducer, applyMiddleware(thunk, logger))