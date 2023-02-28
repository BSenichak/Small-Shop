import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  switchPageTheme,
  toggleCartState,
  toggleUserWindowState,
} from "../../store/header/headerActions";
import { Link } from "react-router-dom";
import { BsSun, BsMoon, BsCart3, BsPerson, BsSearch } from "react-icons/bs";
import Cart from "./Cart/Cart";
import UserMenu from "./UserMenu/UserMenu";

export const Header = (props) => {
  const dispatch = useDispatch();
  const pageTheme = useSelector((state) => state.header.pageTheme);
  const cartState = useSelector((state) => state.header.cartState);
  const userWindowState = useSelector((state) => state.header.userWindowState);
  const cartBtn = useRef(null);
  const userBtn = useRef(null);
  useEffect(() => {
    if (pageTheme === "light") {
      document.body.classList.add("light-palette");
      document.body.classList.remove("dark-palette");
    } else {
      document.body.classList.add("dark-palette");
      document.body.classList.remove("light-palette");
    }
  });
  return (
    <header>
      <div className={s.linkBar}>
        <Link to={"/contacts"}>Constacts</Link>
        <Link to={"/aboutus"}>About us</Link>
        <Link to={"/payment"}>Payment</Link>
        <Link to={"/delivery"}>Delivery</Link>
        <a href="tel:+380957004260">Call us: +38-095-700-4260</a>
      </div>
      <div className={s.header}>
        <Link className={s.logo} to="/">
          SMALL SHOP
        </Link>
        <div className={s.searchBar}>
          <input
            type="text"
            placeholder="Write something you would like to find..."
          />
          <BsSearch />
        </div>
        <div className={s.btns}>
          <div className={s.btn}>
            {pageTheme === "light" ? (
              <BsMoon onClick={() => dispatch(switchPageTheme())} />
            ) : (
              <BsSun onClick={() => dispatch(switchPageTheme())} />
            )}
          </div>
          <div className={s.btn} ref={cartBtn}>
            <BsCart3 onClick={() => dispatch(toggleCartState())} />
            {cartState && <Cart btn={cartBtn.current}/>}
          </div>
          <div className={s.btn} ref={userBtn}>
            <BsPerson onClick={()=>dispatch(toggleUserWindowState())}/>
            {userWindowState && <UserMenu btn={userBtn.current}/>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default connect()(Header);
