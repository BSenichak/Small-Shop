import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../plagins/firebase";

export const START_ADMIN_LOAD_ORDERS = "START_ADMIN_LOAD_ORDERS";
export const FAILED_ADMIN_LOAD_ORDERS = "FAILED_ADMIN_LOAD_ORDERS";
export const SUCCESS_ADMIN_LOAD_ORDERS = "SUCCESS_ADMIN_LOAD_ORDERS";

export const adminLoadOrders = (status = "start") => {
  return (dispatch) => {
    dispatch(startAdminLoadOrders());
    const orders = [];
    getDocs(query(collection(db, "orders"), where("status", "==", status)))
      .then((res) => {
        res.docs.forEach((el) => {
          let item = el.data();
          item.uuid = el.id;
          orders.push(item);
        });
        dispatch(successAdminLoadOrders(orders));
      })
      .catch((err) => dispatch(failedAdminLoadOrders(err)));
  };
};

export const startAdminLoadOrders = () => {
  return {
    type: START_ADMIN_LOAD_ORDERS,
  };
};

export const failedAdminLoadOrders = (err) => {
  return {
    type: FAILED_ADMIN_LOAD_ORDERS,
    payload: err,
  };
};

export const successAdminLoadOrders = (data) => {
  return {
    type: SUCCESS_ADMIN_LOAD_ORDERS,
    payload: data,
  };
};

export const START_GET_SINGLE_ORDER_PRODUCTS =
  "START_GET_SINGLE_ORDER_PRODUCTS";
export const SUCCESS_GET_SINGLE_ORDER_PRODUCTS =
  "SUCCESS_GET_SINGLE_ORDER_PRODUCTS";
export const FAILED_GET_SINGLE_ORDER_PRODUCTS =
  "FAILED_GET_SINGLE_ORDER_PRODUCTS";

export const getSingleOrderProducts = (elements) => {
  return (dispatch) => {
    dispatch(startGetSingleProducts());
    const products = [];
    elements.forEach((el) => {
      getDoc(doc(db, "products", el.id))
        .then((el) => {
          let item = el.data()
          item.uuid = el.id
          products.push(item);
          setTimeout(()=>dispatch(successGetSingleProducts(products)), 300);
        })
        .catch((err) => dispatch(failedGetSingleProducts(err)));
    });
  };
};

export const startGetSingleProducts = () => {
  return {
    type: START_GET_SINGLE_ORDER_PRODUCTS,
  };
};

export const failedGetSingleProducts = (err) => {
  return {
    type: FAILED_GET_SINGLE_ORDER_PRODUCTS,
    payload: err,
  };
};

export const successGetSingleProducts = (data) => {
  return {
    type: SUCCESS_GET_SINGLE_ORDER_PRODUCTS,
    payload: data,
  };
};

export const SET_OPEN_ORDER = "SET_OPEN_ORDER";

export const setOpenOrder = (id) => {
  return {
    type: SET_OPEN_ORDER,
    payload: id,
  };
};
