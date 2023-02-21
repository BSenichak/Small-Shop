import { SET_PAGE_THEME, SWITCH_PAGE_THEME } from "./headerActions";

const initalState = {
  pageTheme: "light",
};

export default function headerReducer(state = initalState, action) {
  switch (action.type) {
    case SWITCH_PAGE_THEME:
      window.localStorage.setItem("theme", state.pageTheme==="light" ? "dark" : "light" );
      return {
        ...state,
        pageTheme: state.pageTheme==="light" ? "dark" : "light",
      };
    case SET_PAGE_THEME:
      window.localStorage.setItem("theme", action.payload);
      return {
        ...state,
        pageTheme: action.payload,
      };
    default:
      return state;
  }
}
