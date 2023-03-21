import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../../plagins/firebase";

export const START_ADMIN_SEARCH_PRODUCT = "START_ADMIN_SEARCH_PRODUCT";
export const FAILED_ADMIN_SEARCH_PRODUCT = "FAILED_ADMIN_SEARCH_PRODUCT";
export const SUCCESS_ADMIN_SEARCH_PRODUCT = "SUCCESS_ADMIN_SEARCH_PRODUCT";

export const adminSearchProduct = (str) => {
  return (dispatch) => {
    dispatch(startAdminSearchProduct());
    const result = [];
    getDocs(
      query(
        collection(db, "products"),
        orderBy("name"),
        startAt(str),
        endAt(str + "\uf8ff"),
        limit(10)
      )
    ).then((res) => {
      res.forEach((el) => {
        let product = el.data();
        product.uuid = el.id;
        result.push(product);
      });
      dispatch(successAdminSearchProduct(result))
    })
    .catch(err=>{
        dispatch(failedAdminSearchProduct(err))
    })
  };
};

export const startAdminSearchProduct = () => {
  return {
    type: START_ADMIN_SEARCH_PRODUCT,
  };
};

export const failedAdminSearchProduct = (err) => {
  return {
    type: FAILED_ADMIN_SEARCH_PRODUCT,
    payload: err,
  };
};

export const successAdminSearchProduct = (data) => {
  return {
    type: SUCCESS_ADMIN_SEARCH_PRODUCT,
    payload: data,
  };
};
