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

export const START_ADMIN_POSTER_LOAD = "START_ADMIN_POSTER_LOAD";
export const FAILED_ADMIN_POSTER_LOAD = "FAILED_ADMIN_POSTER_LOAD";
export const SUCCESS_ADMIN_POSTER_LOAD = "SUCCESS_ADMIN_POSTER_LOAD";

export const adminPosterLoad = () => {
  return (dispatch) => {
    let posters = [];
    dispatch(startAdminPosterLoad());
    getDocs(query(collection(db, "homePagePosters")))
      .then((data) => {
        data.docs.forEach((el) => {
          let a = el.data();
          a.uuid = el.id;
          posters.push(a);
        });
        dispatch(successAdminPosterLoad(posters.sort((a, b) => a.id - b.id)));
      })
      .catch((error) => dispatch(failedAdminPosterLoad(error)));
  };
};

export const startAdminPosterLoad = () => {
  return {
    type: START_ADMIN_POSTER_LOAD,
  };
};
export const failedAdminPosterLoad = (error) => {
  return {
    type: FAILED_ADMIN_POSTER_LOAD,
    payload: error,
  };
};
export const successAdminPosterLoad = (data) => {
  return {
    type: SUCCESS_ADMIN_POSTER_LOAD,
    payload: data,
  };
};

/* --- move poster --- */

export const ADMIN_MOVE_UP_POSTER = "ADMIN_MOVE_UP_POSTER";
export const ADMIN_MOVE_DOWN_POSTER = "ADMIN_MOVE_DOWN_POSTER";
export const ADMIN_DELETE_POSTER = "ADMIN_DELETE_POSTER";

export const adminMoveUpPoster = (id) => {
  return {
    type: ADMIN_MOVE_UP_POSTER,
    payload: id,
  };
};

export const adminMoveDownPoster = (id) => {
  return {
    type: ADMIN_MOVE_DOWN_POSTER,
    payload: id,
  };
};

export const adminDeletePoster = (id) => {
  return {
    type: ADMIN_DELETE_POSTER,
    payload: id,
  };
};

/* --- Update posters --- */

export const START_ADMIN_UPDATE_POSTERS = "START_ADMIN_UPDATE_POSTERS";
export const FAILED_ADMIN_UPDATE_POSTERS = "FAILED_ADMIN_UPDATE_POSTERS";
export const SUCCESS_ADMIN_UPDATE_POSTERS = "SUCCESS_ADMIN_UPDATE_POSTERS";

export const adminUpdatePosters = (posters, del = []) => {
  return (dispatch) => {
    dispatch(startAdminUpdatePosters());
    posters.forEach((el) => {
      updateDoc(doc(db, "homePagePosters", el.uuid), {
        id: el.id,
        bcg: el.bgc,
        link: el.link,
      }).catch((err) => dispatch(failedAdminUpdatePosters(err)));
    });
    if (del.length > 0) {
      del.forEach((el) => {
        deleteDoc(doc(db, "homePagePosters", el.uuid)).catch((err) =>
          dispatch(failedAdminUpdatePosters(err))
        );
        deleteObject(ref(storage, `posters/${el.link}`)).catch((err) =>
          dispatch(failedAdminUpdatePosters(err))
        );
      });
    }
    dispatch(successAdminUpdatePosters());
  };
};
export const startAdminUpdatePosters = () => {
  return {
    type: START_ADMIN_UPDATE_POSTERS,
  };
};
export const failedAdminUpdatePosters = (err) => {
  return {
    type: FAILED_ADMIN_UPDATE_POSTERS,
    payload: err,
  };
};
export const successAdminUpdatePosters = () => {
  return {
    type: SUCCESS_ADMIN_UPDATE_POSTERS,
  };
};

/* --- Add new poster --- */

export const START_ADMIN_ADD_NEW_POSTER = "START_ADMIN_ADD_NEW_POSTER";
export const FAILED_ADMIN_ADD_NEW_POSTER = "FAILED_ADMIN_ADD_NEW_POSTER";
export const SUCCESS_ADMIN_ADD_NEW_POSTER = "SUCCESS_ADMIN_ADD_NEW_POSTER";

export const adminAddNewPoster = (id, bgc, imgLink, imgFile) => {
  return (dispatch) => {
    dispatch(startAdminAddNewPoster());
    addDoc(collection(db, "homePagePosters"), {
      id,
      bgc,
      link: imgLink,
    })
      .then(() => dispatch(successAdminAddNewPoster()))
      .catch((err) => dispatch(failedAdminAddNewPoster(err)));
    uploadBytes(ref(storage, `posters/${imgLink}`), imgFile, {
      contentType: `image/${imgLink.substring(imgLink.indexOf(".") + 1)}`,
    })
      .then(() => dispatch(successAdminAddNewPoster()))
      .catch((err) => dispatch(failedAdminAddNewPoster(err)));
    setTimeout(() => {
      dispatch(adminPosterLoad());
    }, 1000);
  };
};

export const startAdminAddNewPoster = () => {
  return {
    type: START_ADMIN_ADD_NEW_POSTER,
  };
};

export const failedAdminAddNewPoster = (err) => {
  return {
    type: FAILED_ADMIN_ADD_NEW_POSTER,
    payload: err,
  };
};

export const successAdminAddNewPoster = () => {
  return {
    type: SUCCESS_ADMIN_ADD_NEW_POSTER,
  };
};
