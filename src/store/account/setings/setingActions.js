import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { auth, db, storage } from "../../../plagins/firebase";
import { checkLogin } from "../accountActions";

/* --- UPDATE USER PERSONAL INFO --- */

export const START_UPDATE_USER_PERSONAL_INFO =
  "START_UPDATE_USER_PERSONAL_INFO";
export const FAILED_UPDATE_USER_PERSONAL_INFO =
  "FAILED_UPDATE_USER_PERSONAL_INFO";
export const SUCCESS_UPDATE_USER_PERSONAL_INFO =
  "SUCCESS_UPDATE_USER_PERSONAL_INFO";

export const updateUserPersonalInfo = (
  link,
  file,
  uid,
  uuid,
  img,
  name,
  secondname,
  middlename,
  dob,
  gender
) => {
  return (dispatch) => {
    dispatch(startUpdateUserPersonalInfo());
    if (img) {
      uploadBytes(
        ref(storage, `userphoto/${uid}${link.substring(link.indexOf("."))}`),
        file,
        {
          contentType: `image/${link.substring(link.indexOf(".") + 1)}`,
        }
      )
        .then((data) =>
          updateDoc(doc(db, "users", uuid), { img: data.metadata.name })
        )
        .catch((err) => dispatch(failedUpdateUserPersonalInfo(err)));
    }
    updateDoc(doc(db, "users", uuid), {
      firstName: name,
      secondName: secondname,
      middlename,
      gender,
      dob,
    })
      .then(() => dispatch(successUpdateUserPersonalInfo()))
      .catch((err) => dispatch(failedUpdateUserPersonalInfo(err)));
    setTimeout(() => {
      dispatch(checkLogin());
    }, 2000);
  };
};

export const startUpdateUserPersonalInfo = () => {
  return {
    type: START_UPDATE_USER_PERSONAL_INFO,
  };
};

export const failedUpdateUserPersonalInfo = (err) => {
  return {
    type: FAILED_UPDATE_USER_PERSONAL_INFO,
    payload: err,
  };
};

export const successUpdateUserPersonalInfo = () => {
  return {
    type: SUCCESS_UPDATE_USER_PERSONAL_INFO,
  };
};

/* --- UPDATE USER CONTACT DATA --- */

export const START_UPDATE_USER_CONTACT_DATA = "START_UPDATE_USER_CONTACT_DATA";
export const FAILED_UPDATE_USER_CONTACT_DATA =
  "FAILED_UPDATE_USER_CONTACT_DATA";
export const SUCCESS_UPDATE_USER_CONTACT_DATA =
  "SUCCESS_UPDATE_USER_CONTACT_DATA";

export const updateUserContactData = (
  uuid,
  phoneNumber = "",
  homeCity = "",
  homeStreet = "",
  homehouse = "",
  homeflat = "",
  postCity = "",
  postNumber = ""
) => {
  return (dispatch) => {
    dispatch(startUpdateUserContactData());
    updateDoc(doc(db, "users", uuid), {
      phoneNumber,
      homeCity,
      homeStreet,
      homehouse,
      homeflat,
      postCity,
      postNumber,
    })
      .then(() => dispatch(successUpdateUserContactData()))
      .catch((err) => dispatch(failedUpdateUserContactData(err)));
    setTimeout(() => {
      dispatch(checkLogin());
    }, 2000);
  };
};

export const startUpdateUserContactData = () => {
  return {
    type: START_UPDATE_USER_CONTACT_DATA,
  };
};

export const failedUpdateUserContactData = (err) => {
  return {
    type: FAILED_UPDATE_USER_CONTACT_DATA,
    payload: err,
  };
};

export const successUpdateUserContactData = () => {
  return {
    type: SUCCESS_UPDATE_USER_CONTACT_DATA,
  };
};

/*---UPDATE USER LOGIN DATA ---*/

export const START_UPDATE_USER_LOGIN_DATA = "START_UPDATE_USER_LOGIN_DATA";
export const FAILED_UPDATE_USER_LOGIN_DATA = "FAILED_UPDATE_USER_LOGIN_DATA";
export const SUCCESS_UPDATE_USER_LOGIN_DATA = "SUCCESS_UPDATE_USER_LOGIN_DATA";

export const updateUserLoginData = (newEmail, newPassword, password) => {
  return (dispatch) => {
    dispatch(() => startUpdateUserLoginData());
    reauthenticateWithCredential(
      auth.currentUser,
      EmailAuthProvider.credential(auth.currentUser.email, password)
    );
    if (newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(dispatch(() => successUpdateUserLoginData()))
        .catch((err) => dispatch(failedUpdateUserLoginData(err)));
    }
    if (newPassword) {
      updatePassword(auth.currentUser, newPassword)
        .then(dispatch(() => successUpdateUserLoginData()))
        .catch((err) => dispatch(failedUpdateUserLoginData(err)));
    }
  };
};

export const startUpdateUserLoginData = () => {
  return {
    type: START_UPDATE_USER_LOGIN_DATA,
  };
};

export const failedUpdateUserLoginData = (err) => {
  return {
    type: FAILED_UPDATE_USER_LOGIN_DATA,
    payload: err,
  };
};

export const successUpdateUserLoginData = () => {
  return {
    type: SUCCESS_UPDATE_USER_LOGIN_DATA,
  };
};

/*---DELETE ACCOUT --*/

export const START_DELETE_ACCOUNT = "START_DELETE_ACCOUNT";
export const FAILED_DELETE_ACCOUNT = "FAILED_DELETE_ACCOUNT";
export const SUCCESS_DELETE_ACCOUNT = "SUCCESS_DELETE_ACCOUNT";

export const deleteAccount = (password, uid) => {
  return (dispatch) => {
    dispatch(startDeleteAccout());
    reauthenticateWithCredential(
      auth.currentUser,
      EmailAuthProvider.credential(auth.currentUser.email, password)
    ).then(() => {
      deleteUser(auth.currentUser)
        .then(() => dispatch(successDeleteAccout()))
        .catch((err) => dispatch(failedDeleteAccout(err)));
      deleteDoc(doc(db, "users", uid))
    });
  };
};

export const startDeleteAccout = () => {
  return {
    type: START_DELETE_ACCOUNT,
  };
};
export const failedDeleteAccout = (err) => {
  return {
    type: FAILED_DELETE_ACCOUNT,
    payload: err,
  };
};
export const successDeleteAccout = () => {
  return {
    type: SUCCESS_DELETE_ACCOUNT,
  };
};

/* --- CONFIRM WINDOW STATE --- */

export const OPEN_CONFIRM_WINDOW = "OPEN_CONFIRM_WINDOW";
export const CLOSE_CONFIRM_WINDOW = "CLOSE_CONFIRM_WINDOW";

export const openConfirmWindow = () => {
  return {
    type: OPEN_CONFIRM_WINDOW,
  };
};
export const closeConfirmWindow = () => {
  return {
    type: CLOSE_CONFIRM_WINDOW,
  };
};
