import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../plagins/firebase";

export const LOAD_PRODUCT = "LOAD_PRODUCT";
export const START_LOAD_PRODUCT = "START_LOAD_PRODUCT";
export const FAILED_LOAD_PRODUCT = "FAILED_LOAD_PRODUCT";
export const SUCCESS_LOAD_PRODUCT = "SUCCESS_LOAD_PRODUCT";

export const loadProduct = (category, id) => {
  return (dispatch) => {
    dispatch(startLoadProduct());
    getDocs(
      query(
        collection(db, "products"),
        where("category", "==", category),
        where("id", "==", id)
      )
    )
      .then((res) => dispatch(successLoadProduct(res.docs[0].data())))
      .catch((err) => dispatch(failedLoadProduct(err)));
  };
};

export const startLoadProduct = () => {
  return {
    type: START_LOAD_PRODUCT,
  };
};

export const failedLoadProduct = (err) => {
  return {
    type: FAILED_LOAD_PRODUCT,
    payload: err,
  };
};

export const successLoadProduct = (data) => {
  return {
    type: SUCCESS_LOAD_PRODUCT,
    payload: data,
  };
};
