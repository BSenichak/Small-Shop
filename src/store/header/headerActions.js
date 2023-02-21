export const SWITCH_PAGE_THEME = "SWITCH_PAGE_THEME"
export const SET_PAGE_THEME = "SET_PAGE_THEME"

export const switchPageTheme = () => {
    return {
        type: SWITCH_PAGE_THEME,
    }
}
export const setPageTheme = (theme) => {
    return {
        type: SET_PAGE_THEME,
        payload: theme
    }
}