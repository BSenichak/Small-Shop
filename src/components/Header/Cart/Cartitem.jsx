import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import s from "./Cart.module.css";
import { BsTrash } from "react-icons/bs";
import {
  removeItemFromCart,
  updateItemToCart,
} from "../../../store/header/headerActions";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../plagins/firebase";

export const Cartitem = (props) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  useEffect(() => {
    getDownloadURL(
      ref(storage, `products/${props.el.category}/${props.el.img}`)
    ).then((url) => setImage(url));
  });
  const addItem = (el) => {
    return {
      ...el,
      count: el.count + 1,
    };
  };
  const minusItem = (el) => {
    return {
      ...el,
      count: el.count > 0 ? el.count - 1 : 0,
    };
  };
  const changeCountItem = (el, cou) => {
    return {
      ...el,
      count: isNaN(cou) ? 1 : Number(cou),
    };
  };
  return (
    <div key={props.el.id} className={s.item}>
      <div className={s.info}>
        <img src={image} alt={props.el.name} />
        <div>{props.el.name}</div>
      </div>
      <div className={s.stepper_input}>
        <button
          className={s.stepper_input__button}
          onClick={() => dispatch(updateItemToCart(minusItem(props.el)))}
        >
          -
        </button>
        <div className={s.stepper_input__content}>
          <input
            type="text"
            className={s.stepper_input__input}
            value={props.el.count}
            onChange={(i) =>
              dispatch(
                updateItemToCart(changeCountItem(props.el, i.target.value))
              )
            }
          />
        </div>
        <button
          className={s.stepper_input__button}
          onClick={() => dispatch(updateItemToCart(addItem(props.el)))}
        >
          +
        </button>
      </div>
      <div className={s.price}>${props.el.price * props.el.count}</div>
      <BsTrash onClick={() => dispatch(removeItemFromCart(props.el.id))} />
    </div>
  );
};

export default connect()(Cartitem);
