import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { updateUserLoginData } from "../../../../store/account/setings/setingActions";
import s from "../UserSetings.module.css";

export const Logininfo = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.data);
  const [btnState, setBtnState] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeadPassword, setRepeadNewPassword] = useState("");

  const [oneLowercase, setoneLowercase] = useState(false);
  const [oneUppercase, setoneUppercase] = useState(false);
  const [oneNumeric, setoneNumeric] = useState(false);
  const [passLong, setpassLong] = useState(false);

  const emailValid = (e) => {
    let str = e.target.value;
    setNewEmail(str);
    if (
      str.length < 3 ||
      !new RegExp("([@])").test(str) ||
      !new RegExp("([.])").test(str)
    ) {
      e.target.style.borderColor = "red";
      setBtnState(false);
    } else {
      e.target.style.borderColor = "green";
      setBtnState(true);
    }
  };

  const checkPassword = (e) => {
    let p = e.target.value;
    setNewPassword(p);
    setoneLowercase(false);
    setoneUppercase(false);
    setoneNumeric(false);
    setpassLong(false);
    if (!new RegExp("([a-z])").test(p)) setoneLowercase(true);
    if (!new RegExp("([A-Z])").test(p)) setoneUppercase(true);
    if (!new RegExp("([0-9])").test(p)) setoneNumeric(true);
  };

  const checkRepeadPassword = (e) => {
    setRepeadNewPassword(e.target.value);
    if (
      newPassword === e.target.value &&
      !oneLowercase &&
      !oneUppercase &&
      !oneNumeric &&
      !passLong
    ) {
      setBtnState(true);
      e.target.style.borderColor = "green";
    } else {
      setBtnState(false);
      e.target.style.borderColor = "red";
    }
  };

  return (
    <div className={s.loginWrapper}>
      <h2>Email</h2>
      <div className={s.emailSection}>
        <div className={s.formItem}>
          <span>Current Email</span>
          <p className={s.input}>{data.email}</p>
        </div>
        <div className={s.formItem}>
          <span>New email</span>
          <input
            type="text"
            className={s.input}
            value={newEmail}
            onChange={(e) => emailValid(e)}
          />
        </div>
      </div>
      <h2>Password</h2>
      <div className={s.emailSection}>
        <div className={s.formItem}>
          <span>New Password</span>
          <input
            type="text"
            className={s.input}
            value={newPassword}
            onChange={(e) => checkPassword(e)}
          />
        </div>
        <div className={s.formItem}>
          <span>Repead new password</span>
          <input
            type="text"
            className={s.input}
            value={newRepeadPassword}
            onChange={(e) => checkRepeadPassword(e)}
          />
        </div>
      </div>
      <div className={s.errors}>
        {oneLowercase && (
          <span>
            The password must contain at least 1 lowercase alphabetical
            character
          </span>
        )}
        {oneUppercase && (
          <span>
            The password must contain at least 1 uppercase alphabetical
            character
          </span>
        )}
        {oneNumeric && (
          <span>The password must contain at least 1 numeric character</span>
        )}
        {passLong && (
          <span>The password must be eight characters or longer</span>
        )}
      </div>
      <div
        className={`${s.btn} ${btnState ? s.activeBtn : ""}`}
        onClick={
          btnState
            ? () => {
                dispatch(updateUserLoginData(newEmail, newPassword, data));
                setBtnState(false);
                [...document.getElementsByClassName(s.input)].forEach(
                  (element) => {
                    element.style.borderColor = "var(--primary-color)";
                  }
                );
              }
            : null
        }
      >
        SAVE
      </div>
    </div>
  );
};

export default connect()(Logininfo);
