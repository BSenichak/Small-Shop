import { addDoc, collection } from "firebase/firestore";
import { db } from "../../plagins/firebase";

export const START_USER_ORDERING = "START_USER_ORDERING";
export const FAILED_USER_ORDERING = "FAILED_USER_ORDERING";
export const SUCCESS_USER_ORDERING = "SUCCESS_USER_ORDERING";

export const userOrdering = (user, products, userUUID) => {
  return async (dispatch) => {
    dispatch(startUserOrdering());
    const contacts = user;
    const userID = userUUID;
    const prod = products.map((el) => {
      return { id: el.uuid, count: el.count };
    });
    console.log(user, userID, prod);
    const ref = await addDoc(collection(db, "orders"), {
      user: userID,
      contacts,
      products: prod,
      status: "start",
    })
    .catch((err)=>dispatch(failedUserOrdering(err)));
    dispatch(successUserOrdering(ref.id))
  };
};

export const startUserOrdering = () => {
  return {
    type: START_USER_ORDERING,
  };
};

export const failedUserOrdering = (err) => {
  return {
    type: FAILED_USER_ORDERING,
    payload: err,
  };
};

export const successUserOrdering = (uuid) => {
  return {
    type: SUCCESS_USER_ORDERING,
    payload: uuid,
  };
};
