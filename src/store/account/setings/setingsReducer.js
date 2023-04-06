import {
  CLOSE_CONFIRM_WINDOW,
  FAILED_UPDATE_USER_CONTACT_DATA,
  FAILED_UPDATE_USER_PERSONAL_INFO,
  FAILED_USER_LOAD_ORDERS,
  OPEN_CONFIRM_WINDOW,
  START_UPDATE_USER_CONTACT_DATA,
  START_UPDATE_USER_PERSONAL_INFO,
  START_USER_LOAD_ORDERS,
  SUCCESS_UPDATE_USER_CONTACT_DATA,
  SUCCESS_UPDATE_USER_PERSONAL_INFO,
  SUCCESS_USER_LOAD_ORDERS,
} from "./setingActions";

const initalState = {
  loading: false,
  error: null,
  success: false,
  confirmWindow: false,
  orders: [],
};

export default function setingsReducer(state = initalState, action) {
  switch (action.type) {
    case START_UPDATE_USER_PERSONAL_INFO:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case FAILED_UPDATE_USER_PERSONAL_INFO:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_UPDATE_USER_PERSONAL_INFO:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case START_UPDATE_USER_CONTACT_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case FAILED_UPDATE_USER_CONTACT_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_UPDATE_USER_CONTACT_DATA:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case OPEN_CONFIRM_WINDOW:
      return {
        ...state,
        confirmWindow: true,
      };
    case CLOSE_CONFIRM_WINDOW:
      return {
        ...state,
        confirmWindow: false,
      };
    case START_USER_LOAD_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_USER_LOAD_ORDERS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: action.payload,
      };
    case FAILED_USER_LOAD_ORDERS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
