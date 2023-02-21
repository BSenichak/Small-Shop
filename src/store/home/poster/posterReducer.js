import { FAILED_LOAD_POSTERS, START_LOAD_POSTERS, SUCCESS_LOAD_POSTERS } from "./posterActions"

const initalState = {
    loading: false,
    error: null,
    posters: []
}

export default function posterReducer(state=initalState, action){
    switch(action.type){
        case START_LOAD_POSTERS:
            return {
                ...state,
                loading: true
            }
        case FAILED_LOAD_POSTERS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SUCCESS_LOAD_POSTERS:
            return {
                ...state,
                loading: false,
                posters: action.payload
            }
        default:
            return state
    }
}