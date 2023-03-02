import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { db, storage } from "../../../plagins/firebase";
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
      .then(()=>dispatch(successUpdateUserPersonalInfo()))
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
