import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../../store/home/categories/categoriesActions";
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
          <div key={el.id} className={s.item}>
            <img alt={`cat${el.id}`} src={el.img} className={s.itemImg} />
            <div className={s.itemTitle}>
              {el.name.charAt(0).toUpperCase() +
                el.name.substr(1).toLowerCase()}
            </div>
          </div>
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
