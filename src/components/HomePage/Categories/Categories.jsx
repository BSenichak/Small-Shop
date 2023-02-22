import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../../store/home/categories/categoriesActions";
import { Link } from "react-router-dom";
import s from "./Categories.module.css";

export const Categories = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.categories.loading);
  const categories = useSelector((state) => state.categories.categories).sort(
    (a, b) => a.id - b.id
  );
  useState(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Categories</div>
      {!isLoading ? (
        categories.map((el) => (
          <Link key={el.id} className={s.item} to={`/category/${el.name}`}>
            <img alt={`cat${el.id}`} src={`https://firebasestorage.googleapis.com/v0/b/shop-f31e9.appspot.com/o/categories%2F${el.img}?alt=media&token=1b2febd7-7b3f-4540-907a-4825276053a4`} className={s.itemImg} />
            <div className={s.itemTitle}>
              {el.name.charAt(0).toUpperCase() +
                el.name.substr(1).toLowerCase()}
            </div>
          </Link>
        ))
      ) : (
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default connect()(Categories);
