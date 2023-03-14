import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCategories } from "../../../store/home/categories/categoriesActions";
import s from "./AdminAddProduct.module.css";

export const AdminAddProduct = (props) => {
  const [render, setRender] = useState(false);
  if (!render) {
    props.loadCategorylist();
    setRender(true);
  }

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    if (
      (name.length > 0, category.length > 0, price.length > 0, desc.length > 0)
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [name, category, price, desc]);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Add product</div>
      <div className={`${s.formItem} ${s.image}`}>
        <label>Image</label>
        <img src={imageUrl?imageUrl:"/image/emptyimg.svg"} alt="" />
        <input
          type="file"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
      <div className={s.formItem}>
        <label>Product name</label>
        <input
          type="text"
          className={s.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={s.formItem}>
        <label>Product price</label>
        <input
          type="text"
          className={s.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={s.formItem}>
        <label>Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className={s.select}
        >
          {props.categories.map((el) => (
            <option key={el.id} value={el.name} className={s.option}>
              {el.name[0].toUpperCase() + el.name.substring(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className={`${s.formItem} ${s.desc}`}>
        <label>Description</label>
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
      </div>
      <div className={`${s.btn} ${btnState ? s.btnActive : ""}`}>ADD</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategorylist: () => dispatch(loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct);
