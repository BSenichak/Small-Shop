import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../../store/account/accountActions";
import s from "./ForgotPassword.module.css";
import { BsCheck2Circle } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

export const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [btnState, setBtnState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const error = useSelector((state) => state.account.error);
  const success = useSelector((state) => state.account.success);
  const checkEmail = (e) => {
    let str = e.target.value;
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
  useEffect(()=>{
    if(success){
      setTimeout(()=>navigate("/login"), 2000)
    }
  },[success, navigate])
  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/forgotpassword.svg" alt="fogotpassword" />
      </div>
      <div className={s.formBox}>
        <h2>FORGOT PASSWORD</h2>
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
        {!!error && <div className={s.error}>User not found!</div>}
        <div
          className={`${s.btn} ${btnState ? s.activeBtn : ""}`}
          onClick={btnState ? () => dispatch(passwordReset(email)) : null}
        >
          SEND MESSAGE
        </div>
        {success && (
          <div className={s.successWrapepr}>
            <div className={s.success}><BsCheck2Circle/></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect()(ForgotPassword);
