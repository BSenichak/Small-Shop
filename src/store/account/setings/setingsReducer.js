import {
  FAILED_UPDATE_USER_CONTACT_DATA,
  FAILED_UPDATE_USER_PERSONAL_INFO,
  START_UPDATE_USER_CONTACT_DATA,
  START_UPDATE_USER_PERSONAL_INFO,
  SUCCESS_UPDATE_USER_CONTACT_DATA,
  SUCCESS_UPDATE_USER_PERSONAL_INFO,
} from "./setingActions";

const initalState = {
  loading: false,
  error: null,
  success: false,
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
    default:
      return state;
  }
}
