import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../plagins/firebase";

export const START_LOGIN = "START_LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";

export const START_REGISTER = "START_REGISTER";
export const FAILED_REGISTER = "FAILED_REGISTER";
export const SUCCESS_REGISTER = "SUCCESS_REGISTER";

export const START_SIGNOUT = "START_SIGNOUT";
export const FAILED_SIGNOUT = "FAILED_SIGNOUT";
export const SUCCESS_SIGNOUT = "SUCCESS_SIGNOUT";

export const START_CHECK_LOGIN = "START_CHECK_LOGIN";
export const FAILED_CHECK_LOGIN = "FAILED_CHECK_LOGIN";
export const SUCCESS_CHECK_LOGIN = "SUCCESS_CHECK_LOGIN";
export const SUCCESS_CHECK_ALLDATA = "SUCCESS_CHECK_ALLDATA";

export const START_PASSWORD_RESET = "START_PASSWORD_RESET"
export const FAILED_PASSWORD_RESET = "FAILED_PASSWORD_RESET"
export const SUCCESS_PASSWORD_RESET = "SUCCESS_PASSWORD_RESET"

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(startLogin());
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data);
        dispatch(successLogin(data));
      })
      .catch((err) => {
        console.log(err.code);
        dispatch(failedLogin(err.code));
      });
  };
};

export const startLogin = () => {
  return {
    type: START_LOGIN,
  };
};

export const failedLogin = (err) => {
  return {
    type: FAILED_LOGIN,
    payload: err,
  };
};

export const successLogin = (data) => {
  return {
    type: SUCCESS_LOGIN,
    payload: data,
  };
};

export const checkLogin = (user) => {
  return (dispatch) => {
    dispatch(startCheckLogin());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(successCheckLogin(user));
        console.clear();
        getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        ).then((data) => dispatch(successCheckAllData(data.docs[0].data())));
      } else {
        dispatch(failedCheckLogin(null));
      }
    });
  };
};

export const startCheckLogin = () => {
  return {
    type: START_CHECK_LOGIN,
  };
};

export const failedCheckLogin = (err) => {
  return {
    type: FAILED_CHECK_LOGIN,
    payload: err,
  };
};

export const successCheckLogin = (data) => {
  return {
    type: SUCCESS_CHECK_LOGIN,
    payload: data,
  };
};

export const signOutAcc = () => {
  return (dispatch) => {
    dispatch(startSignOut());
    signOut(auth)
      .then((data) => {
        dispatch(successSignOut(data));
      })
      .catch((err) => dispatch(failedSignOut(err)));
  };
};

export const startSignOut = () => {
  return {
    type: START_SIGNOUT,
  };
};

export const failedSignOut = (err) => {
  return {
    type: FAILED_SIGNOUT,
    payload: err,
  };
};

export const successSignOut = () => {
  return {
    type: SUCCESS_SIGNOUT,
    payload: null,
  };
};

export const successCheckAllData = (data) => {
  return {
    type: SUCCESS_CHECK_ALLDATA,
    payload: data,
  };
};

export const register = (name, secondname, phonenumber, email, password) => {
  return (dispatch) => {
    dispatch(startRegister())
    createUserWithEmailAndPassword(auth, email, password)
    .then((data)=>{
      successRegister(data)
      addDoc(collection(db, "users"), {
        firstName: name,
        secondName: secondname,
        phoneNumber: phonenumber,
        root: "user",
        uid: data.user.uid,
        img: null
      })
    })
    .catch((err)=>dispatch(failedRegister(err)))
  };
};

export const startRegister = () => {
  return {
    type: START_REGISTER,
  }
}

export const failedRegister = (err) => {
  return {
    type: FAILED_REGISTER,
    payload: err
  }
}

export const successRegister = (data) => {
  return {
    type: SUCCESS_REGISTER,
    payload: data
  }
}

export const passwordReset = (email) => {
  return dispatch => {
    dispatch(startPasswordReset())
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      dispatch(SuccessPasswordReset())
    })
    .catch((err)=>{
      dispatch(failedPasswordReset(err))
    })
  }
}

export const startPasswordReset = () =>{
  return {
    type: START_PASSWORD_RESET,
  }
}

export const failedPasswordReset = (err) =>{
  return {
    type: FAILED_PASSWORD_RESET,
    payload: err
  }
}

export const SuccessPasswordReset = () =>{
  return {
    type: SUCCESS_PASSWORD_RESET,
  }
}