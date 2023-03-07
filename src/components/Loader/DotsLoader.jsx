import React from "react";
import { connect } from "react-redux";
import s from "./Loader.module.css"

export const DotsLoader = (props) => {
  return (
    <div className={s.dotswrapper}>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.circle}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
      <div className={s.shadow}></div>
    </div>
  );
};

export default connect()(DotsLoader);
