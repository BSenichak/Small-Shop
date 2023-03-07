import React from "react";
import { connect } from "react-redux";
import { BsCheck2 } from "react-icons/bs";
import s from "./Loader.module.css";

export const Check = (props) => {
  return (
    <div className={s.checkWrapper}>
      <div className={s.checkBack}>
        <BsCheck2 />
      </div>
    </div>
  );
};

export default connect()(Check);
