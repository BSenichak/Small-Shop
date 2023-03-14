import { FAILED_ADD_ADMIN_PRODUCT, START_ADD_ADMIN_PRODUCT, SUCCESS_ADD_ADMIN_PRODUCT } from "./addProductAdminActions"

const initialState = {
    loading: false,
    error: null
}

export default function adminReducer(state=initialState, action){
    switch(action.type){
        case START_ADD_ADMIN_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FAILED_ADD_ADMIN_PRODUCT:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SUCCESS_ADD_ADMIN_PRODUCT:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state
    }
}
