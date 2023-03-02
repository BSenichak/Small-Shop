import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./Category.module.css";
import { Link } from "react-router-dom";
import { getDownloadURL, ref,  } from "firebase/storage";
import { storage } from "../../plagins/firebase";

export const CategoryItem = (props) => {
    const [image, setImage] = useState("")
    useEffect(()=>{
        getDownloadURL(
            ref(storage, `products/${props.data.category}/${props.data.img}`)
          ).then((url) => setImage(url))
    })
  return (
    <Link
      to={`/product/${props.data.category}/${props.data.id}`}
      className={s.item}
      key={props.data.id}
    >
      <img
        alt={`cat${props.data.id}`}
        src={image}
        className={s.itemImg}
      />
      <div className={s.name}>{props.data.name}</div>
      <div className={s.price}>${props.data.price}</div>
    </Link>
  );
};

export default connect()(CategoryItem);
