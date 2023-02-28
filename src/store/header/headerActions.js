export const SWITCH_PAGE_THEME = "SWITCH_PAGE_THEME";
export const SET_PAGE_THEME = "SET_PAGE_THEME";

export const TOGGLE_CART_STATE = "TOGGLE_CART_STATE";
export const OPEN_CART = "OPEN_CART";
export const CLOSE_CART = "CLOSE_CART";
export const LOAD_CART = "LOAD_CART";

export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const UPDATE_ITEM_TO_CART = "UPDATE_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const TOGGLE_USERWINDOW_STATE = "TOGGLE_USERWINDOW_STATE";
export const OPEN_USERWINDOW = "OPEN_USERWINDOW";
export const CLOSE_USERWINDOW = "CLOSE_USERWINDOW";

export const switchPageTheme = () => {
  return {
    type: SWITCH_PAGE_THEME,
  };
};

export const setPageTheme = (theme) => {
  return {
    type: SET_PAGE_THEME,
    payload: theme,
  };
};

export const toggleCartState = () => {
  return {
    type: TOGGLE_CART_STATE,
  };
};

export const openCart = () => {
  return {
    type: OPEN_CART,
  };
};

export const closeCart = () => {
  return {
    type: CLOSE_CART,
  };
};

export const loadCart = (data) => {
  return {
    type: LOAD_CART,
    payload: data,
  };
};
export const addItemToCart = (data) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: data,
  };
};

export const updateItemToCart = (data) => {
  return {
    type: UPDATE_ITEM_TO_CART,
    payload: data,
  };
};

export const removeItemFromCart = (data) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: data,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const toggleUserWindowState = () => {
  return {
    type: TOGGLE_USERWINDOW_STATE,
  };
};

export const openUserWindow = () => {
  return {
    type: TOGGLE_USERWINDOW_STATE,
  };
};

export const closeUserWindow = () => {
  return {
    type: CLOSE_USERWINDOW,
  };
};
