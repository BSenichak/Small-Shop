import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadCategoryProduct } from "../../store/category/categotyActions";
import s from "./Category.module.css";

export const Category = (props) => {
  const categoryName = useLocation()
    .pathname.substring(10)
    .replace(/%20/g, " ");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoryProduct(categoryName));
  }, [dispatch, categoryName]);
  const products = useSelector((state) => state.category.products);
  const loading = useSelector((state) => state.category.loading);
  return (
    <div className={s.wrapper}>
      <h1>
        {categoryName.charAt(0).toUpperCase() +
          categoryName.substring(1).toLowerCase()}
      </h1>
      {!loading ? (
        <div className={s.grid}>
          {products.map((el) => (
            <Link to={`/product/${el.category}/${el.name}`} className={s.item}>
              <img
                alt={`cat${el.id}`}
                src={`https://firebasestorage.googleapis.com/v0/b/shop-f31e9.appspot.com/o/products%2F${el.category}%2F${el.img}?alt=media&token=1b2febd7-7b3f-4540-907a-4825276053a4`}
                className={s.itemImg}
              />
              <div className={s.name}>{el.name}</div>
              <div className={s.price}>${el.price}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default connect()(Category);
