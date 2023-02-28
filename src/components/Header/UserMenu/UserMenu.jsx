import React, { useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { closeUserWindow } from "../../../store/header/headerActions";
import s from "./UserMenu.module.css";

export const UserMenu = (props) => {
  const windowRef = useRef(null);
  const dispatch = useDispatch();
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
        {true?(
            <div className={s.unlogined}>
                <div className={s.unlDesc}>If you already have an account</div>
                <Link className={s.unlBtn} to={"/login"} onClick={()=>dispatch(closeUserWindow())}>LOGIN IN</Link>
                <div className={s.unlDesc}>If you don`t have account</div>
                <Link className={s.unlBtn} to={"/register"} onClick={()=>dispatch(closeUserWindow())}>REGISTER</Link>
            </div>
        ):("logined")}
    </div>
  );
};

export default connect()(UserMenu);
