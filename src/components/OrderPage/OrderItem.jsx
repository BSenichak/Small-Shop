import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import s from "./OrderPage.module.css";
import { BsTrash } from "react-icons/bs";
import {
  removeItemFromCart,
  updateItemToCart,
} from "../../store/header/headerActions";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../plagins/firebase";
import Loader from "../Loader/Loader";

export const OrderItem = (props) => {
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

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
    <div key={props.el.id} className={s.itemWrapper}>
      <div className={s.info}>
        {imageLoading && <Loader />}
        <img
          src={image}
          alt={props.el.name}
          style={imageLoading ? { display: "none" } : {}}
          onLoad={() => setImageLoading(false)}
        />
        <div>{props.el.name}</div>
      </div>
      <div className={s.stepper_input}>
        <button
          className={s.stepper_input__button}
          onClick={() => props.updateItemToCart(minusItem(props.el))}
        >
          -
        </button>
        <div className={s.stepper_input__content}>
          <input
            type="text"
            className={s.stepper_input__input}
            value={props.el.count}
            onChange={(i) =>
              props.updateItemToCart(changeCountItem(props.el, i.target.value))
            }
          />
        </div>
        <button
          className={s.stepper_input__button}
          onClick={() => props.updateItemToCart(addItem(props.el))}
        >
          +
        </button>
      </div>
      <div className={s.price}>${props.el.price * props.el.count}</div>
      <BsTrash onClick={() => props.removeItemFromCart(props.el.id)} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemToCart: (data) => dispatch(updateItemToCart(data)),
    removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
