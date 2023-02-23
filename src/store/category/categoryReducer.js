import { FAILED_LOAD_CATEGORY_PRODUCT, START_LOAD_CATEGORY_PRODUCT, SUCCESS_LOAD_CATEGORY_PRODUCT } from "./categotyActions"

const initalState = {
    loading: false,
    error:  null,
    products: [],
    sortType: null,
    filterType: null,
    Category: null
}

export default function categoryReducer (state=initalState, action){
    switch(action.type){
        case START_LOAD_CATEGORY_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case FAILED_LOAD_CATEGORY_PRODUCT:
            console.log(action.payload)
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        case SUCCESS_LOAD_CATEGORY_PRODUCT:
            return {
                ...state,
                loading:false,
                products: action.payload
            }
        default:
            return state
    }
}