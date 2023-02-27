import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  removeItemFromCart,
  updateItemToCart,
} from "../../../store/header/headerActions";
import s from "./Cart.module.css";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

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

  useEffect(()=>{
    window.localStorage.setItem("cart", JSON.stringify(cartItems))
  })

  const addItem = (el) => {
    return {
      ...el,
      count: el.count + 1,
    };
  };
  const remioveItem = (el) => {
    return {
      ...el,
      count: el.count > 0 ? el.count - 1 : 0,
    };
  };
  const chanheCountItem = (el, cou) => {
    return {
      ...el,
      count: isNaN(cou) ? 1 : Number(cou),
    };
  };

  return (
    <div className={s.wrapper}>
      {cartItems.length !== 0 ? (
        <div className={s.full}>
          <div className={s.title}>Cart</div>
          {cartItems.map((el) => (
            <div key={el.id} className={s.item}>
              <div className={s.info}>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/shop-f31e9.appspot.com/o/products%2F${el.category}%2F${el.img}?alt=media&token=1b2febd7-7b3f-4540-907a-4825276053a4`}
                  alt={el.name}
                />
                <div>{el.name}</div>
              </div>
              <div className={s.stepper_input}>
                <button
                  className={s.stepper_input__button}
                  onClick={() => dispatch(updateItemToCart(remioveItem(el)))}
                >
                  -
                </button>
                <div className={s.stepper_input__content}>
                  <input
                    type="text"
                    className={s.stepper_input__input}
                    value={el.count}
                    onChange={(i) =>
                      dispatch(
                        updateItemToCart(chanheCountItem(el, i.target.value))
                      )
                    }
                  />
                </div>
                <button
                  className={s.stepper_input__button}
                  onClick={() => dispatch(updateItemToCart(addItem(el)))}
                >
                  +
                </button>
              </div>
              <div className={s.price}>${el.price * el.count}</div>
              <BsTrash onClick={() => dispatch(removeItemFromCart(el.id))} />
            </div>
          ))}
          <Link to={"/"} className={s.orderBtn}>TO ORDER</Link>
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
