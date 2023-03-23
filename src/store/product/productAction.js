import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
        where("category", "==", category.replace(/%20/g, " ")),
        where("id", "==", id)
      )
    )
      .then((res) => {
        let result = res.docs[0].data();
        result.uuid = res.docs[0].id;
        dispatch(successLoadProduct(result));
      })
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

/* --- Sending comment --- */

export const START_USER_ADD_COMMENT_TO_PRODUCT =
  "START_USER_ADD_COMMENT_TO_PRODUCT";
export const FAILED_USER_ADD_COMMENT_TO_PRODUCT =
  "FAILED_USER_ADD_COMMENT_TO_PRODUCT";
export const SUCCESS_USER_ADD_COMMENT_TO_PRODUCT =
  "SUCCESS_USER_ADD_COMMENT_TO_PRODUCT";

export const userAddComentToProduct = (uuid, name, text) => {
  return (dispatch) => {
    dispatch(startUserAddCommentToProduct());
    updateDoc(doc(db, "products", uuid), {
      comments: arrayUnion({
        time: Date.now(),
        name,
        text,
      }),
    })
      .then(() => dispatch(successUserAddCommentToProduct()))
      .catch((err) => dispatch(failedUserAddCommentToProduct(err)));
  };
};

export const startUserAddCommentToProduct = () => {
  return {
    type: START_USER_ADD_COMMENT_TO_PRODUCT,
  };
};

export const failedUserAddCommentToProduct = (err) => {
  return {
    type: FAILED_USER_ADD_COMMENT_TO_PRODUCT,
    payload: err,
  };
};

export const successUserAddCommentToProduct = () => {
  return {
    type: SUCCESS_USER_ADD_COMMENT_TO_PRODUCT,
  };
};
