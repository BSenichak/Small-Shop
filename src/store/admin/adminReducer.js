import {
  FAILED_ADD_ADMIN_PRODUCT,
  START_ADD_ADMIN_PRODUCT,
  SUCCESS_ADD_ADMIN_PRODUCT,
} from "./addProductAdminActions";
import {
  ADMIN_DELETE_POSTER,
  ADMIN_MOVE_DOWN_POSTER,
  ADMIN_MOVE_UP_POSTER,
  FAILED_ADMIN_ADD_NEW_POSTER,
  FAILED_ADMIN_POSTER_LOAD,
  START_ADMIN_ADD_NEW_POSTER,
  START_ADMIN_POSTER_LOAD,
  SUCCESS_ADMIN_ADD_NEW_POSTER,
  SUCCESS_ADMIN_POSTER_LOAD,
} from "./adminPosterManageActions";

const initialState = {
  loading: false,
  error: null,
  posters: [],
  delete: [],
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case START_ADD_ADMIN_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_ADD_ADMIN_PRODUCT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_ADD_ADMIN_PRODUCT:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case START_ADMIN_POSTER_LOAD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_ADMIN_POSTER_LOAD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_ADMIN_POSTER_LOAD:
      return {
        ...state,
        loading: false,
        error: null,
        posters: action.payload,
      };
    case ADMIN_MOVE_UP_POSTER:
      let newPosters = state.posters;
      if (action.payload > 0) {
        newPosters[action.payload].id = action.payload - 1;
        newPosters[action.payload - 1].id = action.payload;
      } else {
        newPosters[action.payload].id = newPosters.length - 1;
        newPosters[newPosters.length - 1].id = action.payload;
      }
      return {
        ...state,
        posters: [...newPosters.sort((a, b) => a.id - b.id)],
      };
    case ADMIN_MOVE_DOWN_POSTER:
      let newPoster = state.posters;
      if (action.payload < newPoster.length - 1) {
        newPoster[action.payload].id = action.payload + 1;
        newPoster[action.payload + 1].id = action.payload;
      } else {
        newPoster[action.payload].id = 0;
        newPoster[0].id = action.payload;
      }
      return {
        ...state,
        posters: [...newPoster.sort((a, b) => a.id - b.id)],
      };
    case ADMIN_DELETE_POSTER:
      let n = state.posters.filter((el) => el.id !== action.payload);
      for (let i = 0; i < n.length; i++) {
        n[i].id = i;
      }
      return {
        ...state,
        posters: [...n],
        delete: [
          ...state.delete,
          state.posters.filter((el) => el.id === action.payload)[0],
        ],
      };
    case START_ADMIN_ADD_NEW_POSTER:
        return {
            ...state,
            loading: true,
            error: null,
        }
    case FAILED_ADMIN_ADD_NEW_POSTER:
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    case SUCCESS_ADMIN_ADD_NEW_POSTER:
        return {
            ...state,
            loading: false,
            error: null,
        }
    default:
      return state;
  }
}
