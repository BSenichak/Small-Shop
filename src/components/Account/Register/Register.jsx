import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./Register.module.css";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { register } from "../../../store/account/accountActions";

export const Register = (props) => {
  const error = useSelector((state) => state.account.error);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [secondname, setSecondname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVidible] = useState(false);

  const [oneLowercase, setoneLowercase] = useState(false);
  const [oneUppercase, setoneUppercase] = useState(false);
  const [oneNumeric, setoneNumeric] = useState(false);
  const [passLong, setpassLong] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.data);
  useEffect(() => {
    user !== null && navigate("/");
  });

  const checkPassword = (e) => {
    let p = e.target.value;
    setoneLowercase(false);
    setoneUppercase(false);
    setoneNumeric(false);
    setpassLong(false);
    if (!new RegExp("([a-z])").test(p)) setoneLowercase(true);
    if (!new RegExp("([A-Z])").test(p)) setoneUppercase(true);
    if (!new RegExp("([0-9])").test(p)) setoneNumeric(true);
    if (p.length < 8) setpassLong(true);
  };

  const checkInput = (e) => {
    let str = e.target.value;
    if (str.length < 3) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "green";
    }
  };

  const checkEmail = (e) => {
    let str = e.target.value;
    if (
      str.length < 3 ||
      !new RegExp("([@])").test(str) ||
      !new RegExp("([.])").test(str)
    ) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "green";
    }
  };
  useEffect(() => {
    if (
      name.length >= 3 &&
      secondname.length >= 3 &&
      phonenumber.length >= 3 &&
      email.length >= 3 &&
      new RegExp("([@])").test(email) &&
      new RegExp("([.])").test(email) &&
      !oneLowercase &&
      !oneUppercase &&
      !oneNumeric &&
      !passLong
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [
    name,
    secondname,
    phonenumber,
    email,
    oneLowercase,
    oneUppercase,
    oneNumeric,
    passLong,
  ]);

  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/register.svg" alt="" />
      </div>
      <div className={s.formBox}>
        <h2>REGISTRATION</h2>
        <div>NAME:</div>
        <input
          type="text"
          className={s.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            checkInput(e);
          }}
        />
        <div>SECONDNAME:</div>
        <input
          type="text"
          className={s.input}
          value={secondname}
          onChange={(e) => {
            setSecondname(e.target.value);
            checkInput(e);
          }}
        />
        <div>PHONE NUMBER:</div>
        <input
          type="text"
          className={s.input}
          value={phonenumber}
          onChange={(e) => {
            setPhonenumber(e.target.value);
            checkInput(e);
          }}
        />
        <div>EMAIL:</div>
        <input
          type="text"
          className={s.input}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            checkEmail(e);
          }}
        />
        {error?.code === "auth/email-already-in-use" && (
          <span className={s.errors}>email already in use</span>
        )}
        <div>PASSWORD:</div>
        <div className={s.password}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={s.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPassword(e);
            }}
          />
          {passwordVisible ? (
            <RxEyeOpen onClick={() => setPasswordVidible(!passwordVisible)} />
          ) : (
            <RxEyeClosed onClick={() => setPasswordVidible(!passwordVisible)} />
          )}
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
          className={`${s.btn} ${buttonState ? s.activeBtn : ""}`}
          onClick={
            buttonState
              ? () =>
                  dispatch(
                    register(name, secondname, phonenumber, email, password)
                  )
              : null
          }
        >
          REGISTER AN ACCOUNT
        </div>
      </div>
    </div>
  );
};

export default connect()(Register);
