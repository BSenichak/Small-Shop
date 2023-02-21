import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../../plagins/firebase";

export const LOAD_POSTERS = "LOAD_POSTERS";
export const START_LOAD_POSTERS = "START_LOAD_POSTERS";
export const FAILED_LOAD_POSTERS = "FAILED_LOAD_POSTERS";
export const SUCCESS_LOAD_POSTERS = "SUCCESS_LOAD_POSTERS";

export const loadPosters = () => {
  return (dispatch) => {
    dispatch(startLoadPosters())
    const posters = [];
    getDocs(query(collection(db, "homePagePosters")))
      .then((res) => {
        res.docs.forEach((el) => posters.push(el.data()));
        dispatch(successLoadPosters(posters))
      })
      .catch((err) => dispatch(failedLoadPosters(err)));
  };
};

export const startLoadPosters = () => {
  return {
    type: START_LOAD_POSTERS,
  };
};

export const failedLoadPosters = (err) => {
  return {
    type: FAILED_LOAD_POSTERS,
    payload: err,
  };
};

export const successLoadPosters = (data) => {
  return {
    type: SUCCESS_LOAD_POSTERS,
    payload: data,
  };
};
