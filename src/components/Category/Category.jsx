import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadCategoryProduct } from "../../store/category/categotyActions";
import s from "./Category.module.css";
import CategoryItem from "./CategoryItem";

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
      default:
        break;
    }
    console.log(search);
    dispatch(loadCategoryProduct(categoryName, methodType, sortType));
  }, [dispatch, categoryName, search, sortType, methodType]);

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
            <CategoryItem data={el}/>
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
