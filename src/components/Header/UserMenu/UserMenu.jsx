import React, { useRef, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAcc } from "../../../store/account/accountActions";
import { closeUserWindow } from "../../../store/header/headerActions";
import s from "./UserMenu.module.css";

export const UserMenu = (props) => {
  const windowRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state=>state.account.data)
  useEffect(() => {
    function clickOutsideWindow(event) {
      if (
        !props.btn.contains(event.target) ||
        (windowRef.current && !windowRef.current.contains(event.target))
      )
        dispatch(closeUserWindow());
    }
    document.addEventListener("click", clickOutsideWindow);
    return () => document.removeEventListener("click", clickOutsideWindow);
  }, [windowRef, dispatch, props.btn]);

  return (
    <div className={s.wrapper}>
        {user===null?(
            <div className={s.unlogined}>
                <div className={s.unlDesc}>If you already have an account</div>
                <Link className={s.unlBtn} to={"/login"} onClick={()=>dispatch(closeUserWindow())}>LOGIN IN</Link>
                <div className={s.unlDesc}>If you don`t have account</div>
                <Link className={s.unlBtn} to={"/register"} onClick={()=>dispatch(closeUserWindow())}>REGISTER</Link>
            </div>
        ):(<div className={s.logined}>
          <img src={user.photoURL!==null?user.photoURL:"/image/user.svg"} alt="user" />
          <div>{user.displayName}</div>
          <div onClick={()=>dispatch(signOutAcc())}>signout</div>
        </div>)}
    </div>
  );
};

export default connect()(UserMenu);
