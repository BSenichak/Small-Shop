import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Login.module.css";

export const Login = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/login.svg" alt="" />
      </div>
      <div className={s.formBox}>
        <h2>LOGIN IN</h2>
        <div>EMAIL:</div>
        <input type="text" className={s.input} />
        <div>PASSWORD:</div>
        <input type="password" className={s.input} />
        <div className={s.btn}>LOGIN</div>
        <div className={s.other}>
          <Link to={"forgotpassword"}>Forgot my password</Link>
          <Link to={"/register"}>Don`t have account</Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
