import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../plagins/firebase";

export const LOAD_CATEGORY_PRODUCT = "LOAD_CATEGORY_PRODUCT";
export const START_LOAD_CATEGORY_PRODUCT = "START_LOAD_CATEGORY_PRODUCT";
export const FAILED_LOAD_CATEGORY_PRODUCT = "FAILED_LOAD_CATEGORY_PRODUCT";
export const SUCCESS_LOAD_CATEGORY_PRODUCT = "SUCCESS_LOAD_CATEGORY_PRODUCT";

export const loadCategoryProduct = (category, sort, sortDirection) => {
  return (dispatch) => {
    dispatch(startLoadCategoryProduct());
    const products = [];
    getDocs(
      query(
        collection(db, "products"),
        where("category", "==", category),
        orderBy(sort, sortDirection),
        limit(16)
      )
    )
      .then((res) => {
        res.docs.forEach((el) => products.push(el.data()));
        dispatch(successLoadCategoryProduct(products));
      })
      .catch((err) => dispatch(failedLoadCategoryProduct(err)));
  };
};

export const startLoadCategoryProduct = () => {
  return {
    type: START_LOAD_CATEGORY_PRODUCT,
  };
};

export const failedLoadCategoryProduct = (err) => {
  return {
    type: FAILED_LOAD_CATEGORY_PRODUCT,
    payload: err,
  };
};

export const successLoadCategoryProduct = (data) => {
  return {
    type: SUCCESS_LOAD_CATEGORY_PRODUCT,
    payload: data,
  };
};
