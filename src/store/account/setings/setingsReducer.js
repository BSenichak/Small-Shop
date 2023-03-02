import { FAILED_UPDATE_USER_PERSONAL_INFO, START_UPDATE_USER_PERSONAL_INFO, SUCCESS_UPDATE_USER_PERSONAL_INFO } from "./setingActions";

const initalState = {};

export default function setingsReducer(state = initalState, action) {
  switch (action.type) {
    case START_UPDATE_USER_PERSONAL_INFO:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
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
    default:
      return state;
  }
}
