import { FAILED_LOAD_CATEGORIES, START_LOAD_CATEGORIES, SUCCESS_LOAD_CATEGORIES } from "./categoriesActions";

const initalState = {
    loading: false,
    error: null,
    categories: []
};

export default function categoriesReducer(state = initalState, action) {
  switch (action.type) {
    case START_LOAD_CATEGORIES:
        return {
            ...state,
            loading: true,
        }
    case FAILED_LOAD_CATEGORIES:
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    case SUCCESS_LOAD_CATEGORIES:
        return {
            ...state,
            loading: false,
            categories: action.payload,
        }
    default:
      return state;
  }
}
