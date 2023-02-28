import { FAILED_CHECK_LOGIN, FAILED_LOGIN, FAILED_SIGNOUT, START_CHECK_LOGIN, START_LOGIN, START_SIGNOUT, SUCCESS_CHECK_LOGIN, SUCCESS_LOGIN, SUCCESS_SIGNOUT } from "./accountActions";

const initalState = {
    loading: false,
    error: null,
    data: null,
    uid: null
};

export default function accountReducer(state = initalState, action) {
  switch (action.type) {
    case START_LOGIN:
        return {
            ...state,
            loading: true,
            error: null
        }
    case FAILED_LOGIN:
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    case SUCCESS_LOGIN:
        return {
            ...state,
            loading: false,
            data: action.payload,
            error: null
        }
    case START_CHECK_LOGIN:
        return {
            ...state,
            loading: true,
            error: null
        }
    case FAILED_CHECK_LOGIN:
        return {
            ...state,
            loading: false,
            data: null,
        }
    case SUCCESS_CHECK_LOGIN:
        return {
            ...state,
            loading: false,
            data: action.payload,
            error: null
        }
    case START_SIGNOUT:
        return {
            ...state,
            loading: true,
            error: null
        }
    case FAILED_SIGNOUT:
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    case SUCCESS_SIGNOUT:
        return {
            ...state,
            loading: false,
            data: action.payload,
            error: null
        }
    
    default:
      return state;
  }
}
