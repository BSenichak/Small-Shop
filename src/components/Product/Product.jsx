import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addItemToCart } from "../../store/header/headerActions";
import {
  loadProduct,
  userAddComentToProduct,
} from "../../store/product/productAction";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../plagins/firebase";
import s from "./Product.module.css";

export const Product = (props) => {
  const dispatch = useDispatch();

  const [category, id] = useLocation().pathname.substring(9).split("/");
  const data = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  const cart = useSelector((state) => state.header.cart);
  const [image, setImage] = useState("");

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(loadProduct(category, Number(id)));
    getDownloadURL(
      ref(storage, `products/${data?.category?.replace(/ /g, "")}/${data.img}`)
    ).then((url) => setImage(url));
  }, [category, id, dispatch, data.category, data.img]);

  return (
    <div className={s.wrapper}>
      {loading ? (
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      ) : (
        <div className={s.content}>
          <div className={s.imageBox}>
            <img src={image} alt="product" />
          </div>
          <div className={s.infoBox}>
            <div className={s.title}>{data.name}</div>
            <div className={s.desc}>{data.desc}</div>
            <div className={s.priceBar}>
              <div className={s.taringBar}>Rating: {0}</div>
              <div className={s.price}>${data.price}</div>
            </div>
            <div
              onClick={() =>
                dispatch(
                  addItemToCart({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    category: data.category,
                    img: data.img,
                    count: 1,
                    order: cart.length,
                  })
                )
              }
              className={s.buyBtn}
            >
              {cart.filter((el) => el.id === data.id).length > 0
                ? "ADDED"
                : "add to cart"}
            </div>
          </div>
          <div className={s.commentBar}>
            <div className={s.comentTitle}> Comments</div>
            <div className={s.commentForm}>
              <textarea
                placeholder="Write your comment about this product"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
              />
              <div
                className={s.send}
                onClick={
                  commentName.length && commentText.length
                    ? () => {
                        props.addComment(data.uuid, commentName, commentText);
                        dispatch(loadProduct(category, Number(id)));
                        setCommentName("");
                        setCommentText("");
                      }
                    : undefined
                }
              >
                send
              </div>
            </div>
            {props.comments &&
              props.comments.map((el) => (
                <div className={s.comment} key={el.time}>
                  <div className={s.ctitle}>
                    <div className={s.author}>{el.name}</div>
                    <div className={s.comrntTime}>
                      {new Date(el.time).toDateString()}{" "}
                      {new Date(el.time).toTimeString().slice(0, 8)}
                    </div>
                  </div>
                  <div className={s.comrntText}>{el.text}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state?.product?.data?.comments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (uuid, name, text) =>
      dispatch(userAddComentToProduct(uuid, name, text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
