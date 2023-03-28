import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Pagination.module.css";

export const Pagination = (props) => {
    console.log(props.aaa)
  let pages = [];
  for (let i = 1; i <= props.countpages; i++) {
    pages.push(
      <Link
        to={`?$sortType=${props.st}&sortDirection=${props.sd}&page=${i - 1}`}
        className={`${s.pagination__item} ${
          props.cp === undefined && i === 1
            ? s.pagination__item__active
            : Number(props.cp) === Number(i - 1)
            ? s.pagination__item__active
            : ""
        }`}
        key={i}
      >
        {i}
      </Link>
    );
  }
  return <div className={s.pagination}>{pages}</div>;
};

const mapStateToProps = (state) => ({
  countpages: Math.ceil(state?.category?.productsCount / 6),
  aaa: state?.category?.productsCount
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
