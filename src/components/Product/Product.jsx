import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadProduct } from "../../store/product/productAction";
import s from "./Product.module.css";

export const Product = (props) => {
  const dispatch = useDispatch();

  const [category, id] = useLocation().pathname.substring(9).split("/");
  const data = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  useEffect(
    () => dispatch(loadProduct(category, Number(id))),
    [category, id, dispatch]
  );

  return (
    <div className={s.wrapper}>
      {loading ? (
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      ) : (
        <div className={s.content}>
            <div className={s.imageBox}>
                <img src={`https://firebasestorage.googleapis.com/v0/b/shop-f31e9.appspot.com/o/products%2F${data.category}%2F${data.img}?alt=media&token=1b2febd7-7b3f-4540-907a-4825276053a4`} alt="product" />
            </div>
            <div className={s.infoBox}>
                <h2>{data.name}</h2>
                <div>${data.price}</div>
            </div>
        </div>
      )}
    </div>
  );
};

export default connect()(Product);
