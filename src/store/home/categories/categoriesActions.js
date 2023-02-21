import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../plagins/firebase"

export const LOAD_CATEGORIES = "LOAD_CATEGORIES"
export const START_LOAD_CATEGORIES = "START_LOAD_CATEGORIES"
export const FAILED_LOAD_CATEGORIES = "FAILED_LOAD_CATEGORIES"
export const SUCCESS_LOAD_CATEGORIES = "SUCCESS_LOAD_CATEGORIES"

export const loadCategories = () =>{
    return dispatch => {
        dispatch(startloadCaregories())
        const categories = []
        getDocs(collection(db, "categories"))
        .then(res=>{
            res.docs.forEach(i=>categories.push(i.data()))
            dispatch(successloadCaregories(categories))
        })
        .catch(err=>dispatch(failedloadCaregories(err)))
    }
}

export const startloadCaregories = () =>{
    return {
        type: START_LOAD_CATEGORIES
    }
}

export const failedloadCaregories = (err) =>{
    return {
        type: FAILED_LOAD_CATEGORIES,
        payload: err
    }
}

export const successloadCaregories = (data) =>{
    return {
        type: SUCCESS_LOAD_CATEGORIES,
        payload: data
    }
}