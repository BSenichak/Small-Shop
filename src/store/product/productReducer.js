import { FAILED_LOAD_PRODUCT, START_LOAD_PRODUCT, SUCCESS_LOAD_PRODUCT } from "./productAction"

const initalState = {
    loading: false,
    error: null,
    data: []
}

export default function productReducer(state=initalState, action){
    switch(action.type){
        case START_LOAD_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null,
                
            }
        case FAILED_LOAD_PRODUCT:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SUCCESS_LOAD_PRODUCT:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        default:
            return state
    }
}