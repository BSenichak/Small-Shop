import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../plagins/firebase";

export const START_ADMIN_LOAD_CATEGORIES = "START_ADMIN_LOAD_CATEGORIES";
export const FAILED_ADMIN_LOAD_CATEGORIES = "FAILED_ADMIN_LOAD_CATEGORIES";
export const SUCCESS_ADMIN_LOAD_CATEGORIES = "SUCCESS_ADMIN_LOAD_CATEGORIES";

export const adminLoadCategories = () => {
  return (dispatch) => {
    dispatch(startAdminLoadCategories());
    let categ = [];
    getDocs(query(collection(db, "categories")))
      .then((res) => {
        res.forEach((el) => {
          let elem = el.data();
          elem.uuid = el.id;
          categ.push(elem);
        });
        dispatch(successAdminLoadCategories(categ.sort((a, b) => a.id - b.id)));
      })
      .catch((err) => dispatch(failedAdminLoadCategories(err)));
  };
};

export const startAdminLoadCategories = () => {
  return {
    type: START_ADMIN_LOAD_CATEGORIES,
  };
};

export const failedAdminLoadCategories = (err) => {
  return {
    type: FAILED_ADMIN_LOAD_CATEGORIES,
    payload: err,
  };
};

export const successAdminLoadCategories = (categories) => {
  return {
    type: SUCCESS_ADMIN_LOAD_CATEGORIES,
    payload: categories,
  };
};

/* --- move Categories --- */

export const ADMIN_MOVE_UP_CATEGORY = "ADMIN_MOVE_UP_CATEGORY";
export const ADMIN_MOVE_DOWN_CATEGORY = "ADMIN_MOVE_DOWN_CATEGORY";
export const ADMIN_DELETE_CATEGORY = "ADMIN_DELETE_CATEGORY";

export const adminMoveUpCategory = (id) => {
  return {
    type: ADMIN_MOVE_UP_CATEGORY,
    payload: id,
  };
};

export const adminMoveDownCategory = (id) => {
  return {
    type: ADMIN_MOVE_DOWN_CATEGORY,
    payload: id,
  };
};

export const adminDeleteCategory = (id) => {
  return {
    type: ADMIN_DELETE_CATEGORY,
    payload: id,
  };
};


/* --- Update posters --- */

export const START_ADMIN_UPDATE_CATEGORIES = "START_ADMIN_UPDATE_CATEGORIES";
export const FAILED_ADMIN_UPDATE_CATEGORIES = "FAILED_ADMIN_UPDATE_CATEGORIES";
export const SUCCESS_ADMIN_UPDATE_CATEGORIES = "SUCCESS_ADMIN_UPDATE_CATEGORIES";

export const adminUpdateCategories = (categ, del = []) => {
  return (dispatch) => {
    dispatch(startAdminUpdateCategories());
    categ.forEach((el) => {
      updateDoc(doc(db, "categories", el.uuid), {
        id: el.id,
        name: el.name.toLowerCase(),
        img: el.img,
      }).catch((err) => dispatch(failedAdminUpdateCategories(err)));
    });
    if (del.length > 0) {
      del.forEach((el) => {
        deleteDoc(doc(db, "categories", el.uuid)).catch((err) =>
          dispatch(failedAdminUpdateCategories(err))
        );
        deleteObject(ref(storage, `categories/${el.img}`)).catch((err) =>
          dispatch(failedAdminUpdateCategories(err))
        );
      });
    }
    dispatch(successAdminUpdateCategories());
  };
};
export const startAdminUpdateCategories = () => {
  return {
    type: START_ADMIN_UPDATE_CATEGORIES,
  };
};
export const failedAdminUpdateCategories = (err) => {
  return {
    type: FAILED_ADMIN_UPDATE_CATEGORIES,
    payload: err,
  };
};
export const successAdminUpdateCategories = () => {
  return {
    type: SUCCESS_ADMIN_UPDATE_CATEGORIES,
  };
};

/* --- Add new category --- */

export const START_ADMIN_ADD_NEW_CATEGORY = "START_ADMIN_ADD_NEW_CATEGORY";
export const FAILED_ADMIN_ADD_NEW_CATEGORY = "FAILED_ADMIN_ADD_NEW_CATEGORY";
export const SUCCESS_ADMIN_ADD_NEW_CATEGORY = "SUCCESS_ADMIN_ADD_NEW_CATEGORY";

export const adminAddNewCategory = (id, name, imgLink, imgFile) => {
  return (dispatch) => {
    dispatch(startAdminAddNewCategory());
    addDoc(collection(db, "categories"), {
      id,
      name,
      img: imgLink,
    })
      .then(() => dispatch(successAdminAddNewCategory()))
      .catch((err) => dispatch(failedAdminAddNewCategory(err)));
    uploadBytes(ref(storage, `categories/${imgLink}`), imgFile, {
      contentType: `image/${imgLink.substring(imgLink.indexOf(".") + 1)}`,
    })
      .then(() => dispatch(successAdminAddNewCategory()))
      .catch((err) => dispatch(failedAdminAddNewCategory(err)));
    setTimeout(() => {
      dispatch(adminLoadCategories());
    }, 1000);
  };
};

export const startAdminAddNewCategory = () => {
  return {
    type: START_ADMIN_ADD_NEW_CATEGORY,
  };
};

export const failedAdminAddNewCategory = (err) => {
  return {
    type: FAILED_ADMIN_ADD_NEW_CATEGORY,
    payload: err,
  };
};

export const successAdminAddNewCategory = () => {
  return {
    type: SUCCESS_ADMIN_ADD_NEW_CATEGORY,
  };
};