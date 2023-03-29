import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { closeCart } from "../../../store/header/headerActions";
import s from "./Cart.module.css";
import { Link } from "react-router-dom";
import Cartitem from "./Cartitem";

export const Cart = (props) => {
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const cartItems = useSelector((state) => state.header.cart).sort(
    (a, b) => a.order - b.order
  );

  useEffect(() => {
    function clickOutside(event) {
      if (
        !props.btn.contains(event.target) ||
        (cartRef.current && !cartRef.current.contains(event.target))
      )
        dispatch(closeCart());
    }
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [cartRef, dispatch, props.btn]);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  });

  return (
    <div className={s.wrapper}>
      {cartItems.length !== 0 ? (
        <div className={s.full}>
          <div className={s.title}>Cart</div>
          {cartItems.map((el) => (
            <Cartitem el={el} />
          ))}
          <Link to={"/order"} className={s.orderBtn} onClick={()=>dispatch(closeCart())}>
            TO ORDER
          </Link>
        </div>
      ) : (
        <div className={s.empty}>
          <img src="/image/cartEmpty.webp" alt="empty" />
          Cart is empty
        </div>
      )}
    </div>
  );
};

export default connect()(Cart);
