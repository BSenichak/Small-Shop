import React, { useRef, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAcc } from "../../../store/account/accountActions";
import { closeUserWindow } from "../../../store/header/headerActions";
import { getDownloadURL, ref,  } from "firebase/storage";
import { storage } from "../../../plagins/firebase";
import s from "./UserMenu.module.css";

export const UserMenu = (props) => {
  const windowRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.data);
  const fulldata = useSelector((state) => state.account.fullData);
  const [image, setImage] = useState("");
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

  useEffect(()=>{
    getDownloadURL(
      ref(storage, `userphoto/${fulldata?.img}`)
    ).then((url) => setImage(url));
  })

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
                  ? image
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
