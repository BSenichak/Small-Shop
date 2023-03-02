import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import s from "./Categories.module.css";
import { Link } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../plagins/firebase";

export const CatItem = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    getDownloadURL(ref(storage, `categories/${props.data.img}`)).then((url) =>
      setImage(url)
    );
  });

  return (
    <Link
      key={props.data.id}
      className={s.item}
      to={`/category/${props.data.name}`}
    >
      <img alt={`cat${props.data.id}`} src={image} className={s.itemImg} />
      <div className={s.itemTitle}>
        {props.data.name.charAt(0).toUpperCase() +
          props.data.name.substr(1).toLowerCase()}
      </div>
    </Link>
  );
};

export default connect()(CatItem);
