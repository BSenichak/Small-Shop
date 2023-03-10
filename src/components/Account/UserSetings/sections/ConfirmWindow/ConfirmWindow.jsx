import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { closeConfirmWindow, deleteAccount, updateUserLoginData } from "../../../../../store/account/setings/setingActions";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

import s from "./ConfirmWindow.module.css";

export const ConfirmWindow = (props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVidible] = useState(false);
  const uuid = useSelector((state) => state.account.uuid);


  return (
    <div className={s.wrapper}>
      <div className={s.window}>
        <div className={s.title}>Confirm password</div>
        <div className={s.password}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={s.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordVisible ? (
            <RxEyeOpen onClick={() => setPasswordVidible(!passwordVisible)} />
          ) : (
            <RxEyeClosed onClick={() => setPasswordVidible(!passwordVisible)} />
          )}
        </div>
        <div className={s.flex}>
          <div
            className={s.btnC}
            onClick={() => dispatch(closeConfirmWindow())}
          >
            Cancel
          </div>
          <div className={s.btnOK} onClick={()=>{
            console.log(props.newemail, props.newpassword, password)
            if(props.type === "del"){
                dispatch(deleteAccount(password, uuid))
                dispatch(closeConfirmWindow())
            }
            if(props.type === "upd"){
                dispatch(updateUserLoginData(props.newemail, props.newpassword, password))
                dispatch(closeConfirmWindow())
            }
          }}>OK</div>
        </div>
      </div>
    </div>
  );
};

export default connect()(ConfirmWindow);
