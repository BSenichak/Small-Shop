import { FAILED_USER_ORDERING, START_USER_ORDERING, SUCCESS_USER_ORDERING } from "./orderActions";

const initalState = {
    loading: false,
    error: null,
    uuid: undefined
};

export default function orderReducer(state = initalState, action) {
  switch (action.type) {
    case START_USER_ORDERING: 
        return {
            ...state,
            loading: true,
            error: null,
        }
    case FAILED_USER_ORDERING: 
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    case SUCCESS_USER_ORDERING: 
        return {
            ...state,
            loading: false,
            error: null,
            uuid: action.payload
        }
    default:
      return state;
  }
}
