import { reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { auth, db, storage } from "../../../plagins/firebase";
import { checkLogin } from "../accountActions";

export const START_SET_USER_PHOTO = "START_SET_USER_PHOTO";
export const FAILED_SET_USER_PHOTO = "FAILED_SET_USER_PHOTO";
export const SUCCESS_SET_USER_PHOTO = "SUCCESS_SET_USER_PHOTO";

export const START_UPDATE_USER_PERSONAL_INFO =
  "START_UPDATE_USER_PERSONAL_INFO";
export const FAILED_UPDATE_USER_PERSONAL_INFO =
  "FAILED_UPDATE_USER_PERSONAL_INFO";
export const SUCCESS_UPDATE_USER_PERSONAL_INFO =
  "SUCCESS_UPDATE_USER_PERSONAL_INFO";

export const START_UPDATE_USER_CONTACT_DATA = "START_UPDATE_USER_CONTACT_DATA";
export const FAILED_UPDATE_USER_CONTACT_DATA =
  "FAILED_UPDATE_USER_CONTACT_DATA";
export const SUCCESS_UPDATE_USER_CONTACT_DATA =
  "SUCCESS_UPDATE_USER_CONTACT_DATA";

export const START_UPDATE_USER_LOGIN_DATA = "START_UPDATE_USER_LOGIN_DATA"
export const FAILED_UPDATE_USER_LOGIN_DATA = "FAILED_UPDATE_USER_LOGIN_DATA"
export const SUCCESS_UPDATE_USER_LOGIN_DATA = "SUCCESS_UPDATE_USER_LOGIN_DATA"

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

export const updateUserContactData = (
  uuid,
  phoneNumber = "",
  homeCity = "",
  homeStreet = "",
  homehouse = "",
  homeflat = "",
  postCity = "",
  postNumber= ""
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

export const updateUserLoginData = (newEmail ,newPassword, userData) =>{
  return dispatch=> {
    dispatch(()=>startUpdateUserLoginData())
    console.log(newEmail, newPassword, auth, userData)
    reauthenticateWithCredential(auth.currentUser, userData).then((data=>console.log(data))).catch(err=>console.error(err))
    if(newEmail){
      updateEmail(auth.currentUser, newEmail).then(dispatch(()=>successUpdateUserLoginData())).catch(err=>dispatch(failedUpdateUserLoginData(err)))
    }
    if(newPassword){
      updatePassword(auth.currentUser, newPassword).then(dispatch(()=>successUpdateUserLoginData())).catch(err=>dispatch(failedUpdateUserLoginData(err)))
    }
  }
}

export const startUpdateUserLoginData = () => {
  return {
    type: START_UPDATE_USER_LOGIN_DATA
  }
}

export const failedUpdateUserLoginData = (err) => {
  return {
    type: FAILED_UPDATE_USER_LOGIN_DATA,
    payload: err
  }
}

export const successUpdateUserLoginData = () => {
  return {
    type: SUCCESS_UPDATE_USER_LOGIN_DATA,
  }
}
