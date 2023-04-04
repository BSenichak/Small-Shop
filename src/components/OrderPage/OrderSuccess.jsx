import React from "react";
import { connect } from "react-redux";
import s from "./OS.module.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export const OrderSuccess = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {props.loading ? (
          <Loader />
        ) : (
          <div className={s.content}>
            <div className={s.title}>Order #{props.id}</div>
            <div className={s.desc}>Accepted, and will be processed soon</div>
            <Link to={"/"} className={s.btn}>OK</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    id: state.order?.uuid,
    loading: state.order?.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess);
