import {
  FAILED_ADMIN_LOAD_ORDERS,
  FAILED_GET_SINGLE_ORDER_PRODUCTS,
  SET_OPEN_ORDER,
  START_ADMIN_LOAD_ORDERS,
  START_GET_SINGLE_ORDER_PRODUCTS,
  SUCCESS_ADMIN_LOAD_ORDERS,
  SUCCESS_GET_SINGLE_ORDER_PRODUCTS,
} from "./adminOrderActions";

const initalState = {
  loading: false,
  error: null,
  orders: [],
  products: [],
  openOrder: ""
};

export default function adminOrderReducer(state = initalState, action) {
  switch (action.type) {
    case START_ADMIN_LOAD_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_ADMIN_LOAD_ORDERS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_ADMIN_LOAD_ORDERS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: action.payload,
      };
    case START_GET_SINGLE_ORDER_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_GET_SINGLE_ORDER_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_GET_SINGLE_ORDER_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload
      };
    case SET_OPEN_ORDER:
      return {
        ...state,
        openOrder: action.payload
      };
    default:
      return state;
  }
}
