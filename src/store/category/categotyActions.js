import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../plagins/firebase";

export const LOAD_CATEGORY_PRODUCT = "LOAD_CATEGORY_PRODUCT";
export const START_LOAD_CATEGORY_PRODUCT = "START_LOAD_CATEGORY_PRODUCT";
export const FAILED_LOAD_CATEGORY_PRODUCT = "FAILED_LOAD_CATEGORY_PRODUCT";
export const SUCCESS_LOAD_CATEGORY_PRODUCT = "SUCCESS_LOAD_CATEGORY_PRODUCT";

export const loadCategoryProduct = (
  category,
  sort = "__name__",
  sortDirection = "asc",
  page = 0
) => {
  console.log(category, sort, sortDirection, page);
  return async (dispatch) => {
    dispatch(startLoadCategoryProduct());

    const products = [];

    let len = await getCountFromServer(
      query(collection(db, "products"), where("category", "==", category))
    );
    dispatch(setProductsCount(len.data().count));
    getDocs(
      (sort === "price" && sortDirection === "asc")
        ? query(
            collection(db, "products"),
            where("category", "==", category),
            orderBy("price", "asc"),
            endBefore(String(page * 6)),
            limit(6)
          )
        : (sort === "price" && sortDirection === "desc")
        ? query(
            collection(db, "products"),
            where("category", "==", category),
            orderBy("price", "desc"),
            startAfter(String(page * 6)),
            limit(6)
          )
        : query(
            collection(db, "products"),
            where("category", "==", category),
            orderBy("__name__", "asc"),
            startAfter(String(page * 6)),
            limit(6)
          )
    )
      .then((res) => {
        res.docs.forEach((el) => {
          let product = el.data();
          product.uuid = el.id;
          products.push(product);
        });
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

export const SET_PRODUCTS_COUNT = "SET_PRODUCTS_COUNT";

export const setProductsCount = (count) => {
  return {
    type: SET_PRODUCTS_COUNT,
    payload: count,
  };
};
