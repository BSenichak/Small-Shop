import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from "./Category.module.css";
import { Link } from "react-router-dom";
import { getDownloadURL, ref,  } from "firebase/storage";
import { storage } from "../../plagins/firebase";
import Loader from "../Loader/Loader";

export const CategoryItem = (props) => {
    const [image, setImage] = useState("")
    const [imageLoading, setImageLoading] = useState(true)
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
      {imageLoading&&<Loader/>}
      <img
        alt={`cat${props.data.id}`}
        src={image}
        className={s.itemImg}
        style={imageLoading?{display: "none"}:{}}
        onLoad={()=>setImageLoading(false)}
      />
      <div className={s.name}>{props.data.name}</div>
      <div className={s.price}>${props.data.price}</div>
    </Link>
  );
};

export default connect()(CategoryItem);
