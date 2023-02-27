import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  CLOSE_CART,
  LOAD_CART,
  OPEN_CART,
  REMOVE_ITEM_FROM_CART,
  SET_PAGE_THEME,
  SWITCH_PAGE_THEME,
  TOGGLE_CART_STATE,
  UPDATE_ITEM_TO_CART,
} from "./headerActions";

const initalState = {
  pageTheme: "light",
  cartState: false,
  cart: [],
};

export default function headerReducer(state = initalState, action) {
  switch (action.type) {
    case SWITCH_PAGE_THEME:
      window.localStorage.setItem(
        "theme",
        state.pageTheme === "light" ? "dark" : "light"
      );
      return {
        ...state,
        pageTheme: state.pageTheme === "light" ? "dark" : "light",
      };
    case SET_PAGE_THEME:
      window.localStorage.setItem("theme", action.payload);
      return {
        ...state,
        pageTheme: action.payload,
      };
    case TOGGLE_CART_STATE:
      return {
        ...state,
        cartState: !state.cartState,
      };
    case OPEN_CART:
      return {
        ...state,
        cartState: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        cartState: false,
      };
    case ADD_ITEM_TO_CART:
      if (state.cart.filter((el) => el.id === action.payload.id).length > 0) {
        return state;
      }
      window.localStorage.setItem("cart", JSON.stringify([...state.cart, action.payload]))
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: [...state.cart.filter((el) => el.id !== action.payload)],
      };
    case UPDATE_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart.filter((el) => el.id !== action.payload.id), action.payload],
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case LOAD_CART:
      return {
        ...state,
        cart: window.localStorage.getItem("cart")!== null?JSON.parse(window.localStorage.getItem("cart")):[],
      };
    default:
      return state;
  }
}
