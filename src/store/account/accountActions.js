import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../plagins/firebase";

export const START_LOGIN = "START_LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";

export const START_SIGNOUT = "START_SIGNOUT";
export const FAILED_SIGNOUT = "FAILED_SIGNOUT";
export const SUCCESS_SIGNOUT = "SUCCESS_SIGNOUT";

export const START_CHECK_LOGIN = "START_CHECK_LOGIN";
export const FAILED_CHECK_LOGIN = "FAILED_CHECK_LOGIN";
export const SUCCESS_CHECK_LOGIN = "SUCCESS_CHECK_LOGIN";

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(startLogin())
    signInWithEmailAndPassword(auth, email, password)
    .then(data=>{
        console.log(data)
        dispatch(successLogin(data))  
    })
    .catch(err=>{
        console.log(err.code)
        dispatch(failedLogin(err.code))
    })
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
    type:SUCCESS_LOGIN,
    payload: data,
  };
};

export const checkLogin = (user) => {
  return (dispatch) => {
    dispatch(startCheckLogin())
    onAuthStateChanged(auth, user=>{
        if(user){
            dispatch(successCheckLogin(user))
            console.clear()
        }else{
            dispatch(failedCheckLogin(null))
        }
    })
    
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
    type:SUCCESS_CHECK_LOGIN,
    payload: data,
  };
};

export const signOutAcc = () => {
  return (dispatch) => {
        dispatch(startSignOut())
        signOut(auth)
        .then((data)=>dispatch(successSignOut(data)))
        .catch((err)=>dispatch(failedSignOut(err)))
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
    type:SUCCESS_SIGNOUT,
    payload: null,
  };
};


