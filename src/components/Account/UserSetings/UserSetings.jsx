import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import s from "./UserSetings.module.css";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineContacts,
  AiOutlineKey,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import Personalinfo from "./sections/Personalinfo";
import Mycontacts from "./sections/Mycontacts";
import Logininfo from "./sections/Logininfo";
import MyOrders from "./sections/MyOrders";

export const UserSetings = (props) => {
  const link = useLocation().pathname.substring(9);
  const accoutData = useSelector((state) => state.account.data);
  const navigete = useNavigate();
  useEffect(() => {
    if (accoutData === null) {
      navigete("/");
    }
  }, [accoutData, navigete]);

  return (
    <div className={s.wrapper}>
      <div className={s.aside}>
        <Link
          className={link === "personalinfo" ? s.activeLink : ""}
          to={"personalinfo"}
        >
          <AiOutlineUser />
          Personal information
        </Link>
        <Link
          className={link === "mycontacts" ? s.activeLink : ""}
          to={"mycontacts"}
        >
          <AiOutlineContacts />
          My contacts
        </Link>
        <Link
          className={link === "logininfo" ? s.activeLink : ""}
          to={"logininfo"}
        >
          <AiOutlineKey />
          Login
        </Link>
        <Link
          className={link === "myorders" ? s.activeLink : ""}
          to={"myorders"}
        >
          <AiOutlineUnorderedList />
          My orders
        </Link>
      </div>
      <div className={s.content}>
        <Routes>
          <Route path="personalinfo" element={<Personalinfo />} />
          <Route path="mycontacts" element={<Mycontacts />} />
          <Route path="logininfo" element={<Logininfo />} />
          <Route path="myorders" element={<MyOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default connect()(UserSetings);
