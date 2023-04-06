import { createStore, combineReducers, applyMiddleware } from "redux";
// import logger from "redux-logger"
import thunk from "redux-thunk";
import accountReducer from "./account/accountReducer";
import setingsReducer from "./account/setings/setingsReducer";
import adminReducer from "./admin/adminReducer";
import categoryReducer from "./category/categoryReducer";
import headerReducer from "./header/headerReducer";
import categoriesReducer from "./home/categories/categoriesReducer";
import posterReducer from "./home/poster/posterReducer";
import productReducer from "./product/productReducer";
import orderReducer from "./order/orderReducer";
import adminOrderReducer from "./admin/adminOrder/adminOrderReducer";

const generalReducer = combineReducers({
    header: headerReducer,
    poster: posterReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    product: productReducer,
    account: accountReducer,
    setings: setingsReducer,
    admin: adminReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer
})


// export const store = createStore(generalReducer, applyMiddleware(thunk, logger))
export const store = createStore(generalReducer, applyMiddleware(thunk))