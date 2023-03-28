import React, { useEffect} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadCategoryProduct } from "../../store/category/categotyActions";
import s from "./Category.module.css";
import CategoryItem from "./CategoryItem";
import Pagination from "./Pagination/Pagination";
import queryString from "query-string";

export const Category = (props) => {
  const dispatch = useDispatch();

  const categoryName = useLocation()
    .pathname.substring(10)
    .replace(/%20/g, " ");
  const queries = queryString.parse(useLocation().search);
  const secrch = useLocation().search
  useEffect(()=>{
    dispatch(
      loadCategoryProduct(categoryName, queries.sortType, queries.sortDirection, queries.page)
    );
  }, [secrch, dispatch, categoryName, queries.sortDirection, queries.sortType, queries.page])

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
              to={`?sortType=price&sortDirection=desc&page=${queries.page}`}
              className={`${s.sortbtn}`}
              >
              First expensive
            </Link>
            <Link
              to={`?sortType=price&sortDirection=asc&page=${queries.page}`}
              className={`${s.sortbtn}`}
            >
              First cheap
            </Link>
          </div>
          {products.map((el) => (
            <CategoryItem data={el} key={el.id} />
          ))}
          <Pagination st={queries.sortType} sd={queries.sortDirection} cp={queries.page}/>
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
