import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import s from "./AdminCategoriesManage.module.css";
import {
  AiOutlineDelete,
  AiOutlineDownCircle,
  AiOutlineUpCircle,
} from "react-icons/ai";
import { storage } from "../../../plagins/firebase";
import Loader from "../../Loader/Loader";
import { ref, getDownloadURL } from "firebase/storage";
import {
  adminDeleteCategory,
  adminMoveDownCategory,
  adminMoveUpCategory,
} from "../../../store/admin/adminCategoryManageActions";

export const AdminCategoryesItem = (props) => {
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  useEffect(() => {
    getDownloadURL(ref(storage, `categories/${props?.data?.img}`)).then(
      (link) => setImg(link)
    );
  });
  return (
    <div className={s.item}>
      <div>{props.data.id}</div>
      <div>{props.data.name}</div>
      <div className={s.posterBox}>
        {imgLoading && <Loader />}
        <img
          src={img}
          alt={`poster${props?.data?.id}`}
          style={imgLoading ? { display: "none" } : {}}
          onLoad={() => setImgLoading(false)}
        />
      </div>
      <AiOutlineDelete onClick={() => props.del(props.data.id)} />
      <div className={s.arrows}>
        <AiOutlineUpCircle onClick={() => props.moveUp(props.data.id)} />
        <AiOutlineDownCircle onClick={() => props.moveDown(props.data.id)} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    moveUp: (id) => dispatch(adminMoveUpCategory(id)),
    moveDown: (id) => dispatch(adminMoveDownCategory(id)),
    del: (id) => dispatch(adminDeleteCategory(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCategoryesItem);
