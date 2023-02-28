import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../store/account/accountActions";
import s from "./Login.module.css";

export const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.account.error);
  const user = useSelector((state) => state.account.data);
  const navigate = useNavigate()
  useEffect(()=>{
    user!==null&&navigate("/")
  })
  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/login.svg" alt="" />
      </div>
      <div className={s.formBox}>
        <h2>LOGIN IN</h2>
        <div>EMAIL:</div>
        <input
          type="text"
          className={s.input}
          value={email}
          onChange={(el) => setEmail(el.target.value)}
        />
        <div>PASSWORD:</div>
        <input
          type="password"
          className={s.input}
          value={password}
          onChange={(el) => setPassword(el.target.value)}
        />
        <div
          className={s.btn}
          onClick={() => {
            dispatch(login(email, password));
            // setTimeout(() => dispatch(checkLogin(user)),1000);
          }}
        >
          LOGIN
        </div>
        {error !== null && <div>User not found</div>}
        <div className={s.other}>
          <Link to={"forgotpassword"}>Forgot my password</Link>
          <Link to={"/register"}>Don`t have account</Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
