import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadCategoryProduct } from "../../store/category/categotyActions";
import s from "./Category.module.css";

export const Category = (props) => {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState("asc");
  const [methodType, setMethodType] = useState("__name__");

  const categoryName = useLocation()
    .pathname.substring(10)
    .replace(/%20/g, " ");
  const search = useLocation().search;

  useEffect(() => {
    switch (search) {
      case "?pd":
        setMethodType("price");
        setSortType("desc");
        break;
      case "?pa":
        setMethodType("price");
        setSortType("asc");
        break;
    }
    console.log(search);
    dispatch(loadCategoryProduct(categoryName, methodType, sortType));
  }, [dispatch, categoryName, search]);

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
          <div className={s.sortPanel}>
            <Link
              to={search === "?pd" ? categoryName : `${categoryName}?pd`}
              className={`${s.sortbtn} ${search === "?pd" ? s.active : ""}`}
            >
              First expensive
            </Link>
            <Link
              to={search === "?pa" ? categoryName : `${categoryName}?pa`}
              className={`${s.sortbtn} ${search === "?pa" ? s.active : ""}`}
            >
              First cheap
            </Link>
          </div>
          {products.map((el) => (
            <Link
              to={`/product/${el.category}/${el.name}`}
              className={s.item}
              key={el.id}
            >
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
