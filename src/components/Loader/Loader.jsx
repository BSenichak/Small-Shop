import React from "react";
import { connect } from "react-redux";
import s from "./Loader.module.css";

export const Loader = (props) => {
  return (
    <div className={s.newtons_cradle}>
      <div class={s.newtons_cradle__dot}></div>
      <div className={s.newtons_cradle__dot}></div>
      <div className={s.newtons_cradle__dot}></div>
      <div className={s.newtons_cradle__dot}></div>
    </div>
  );
};

export default connect()(Loader);
