import React, { useRef, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAcc } from "../../../store/account/accountActions";
import { closeUserWindow } from "../../../store/header/headerActions";
import s from "./UserMenu.module.css";

export const UserMenu = (props) => {
  const windowRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.data);
  const fulldata = useSelector((state) => state.account.fullData);
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
      {user === null ? (
        <div className={s.unlogined}>
          <div className={s.unlDesc}>If you already have an account</div>
          <Link
            className={s.unlBtn}
            to={"/login"}
            onClick={() => dispatch(closeUserWindow())}
          >
            LOGIN IN
          </Link>
          <div className={s.unlDesc}>If you don`t have account</div>
          <Link
            className={s.unlBtn}
            to={"/register"}
            onClick={() => dispatch(closeUserWindow())}
          >
            REGISTER
          </Link>
        </div>
      ) : (
        <div className={s.logined}>
          <div className={s.userinfo}>
            <img
              src={
                fulldata.img !== null
                  ? `https://firebasestorage.googleapis.com/v0/b/shop-f31e9.appspot.com/o/userphoto%2F${fulldata.img}?alt=media&token=1b2febd7-7b3f-4540-907a-4825276053a4`
                  : "/image/user.svg"
              }
              alt="user"
            />
            <div className={s.userData}>
              <div>{fulldata.firstName}</div>
              <div>{fulldata.secondName}</div>
              <div>{fulldata.phoneNumber}</div>
            </div>
          </div>
          <Link
            className={s.btn}
            to="/setings/personalinfo"
            onClick={() => dispatch(closeUserWindow())}
          >
            SETINGS
          </Link>
          {fulldata.root === "admin" && (
            <Link
              className={s.btn}
              to="/admin"
              onClick={() => dispatch(closeUserWindow())}
            >
              ADMIN
            </Link>
          )}
          <div onClick={() => dispatch(signOutAcc())} className={s.btn}>
            SIGN OUT
          </div>
        </div>
      )}
    </div>
  );
};

export default connect()(UserMenu);
