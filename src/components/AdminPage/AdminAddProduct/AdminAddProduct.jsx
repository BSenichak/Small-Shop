import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addAdminProduct } from "../../../store/admin/addProductAdminActions";
import { loadCategories } from "../../../store/home/categories/categoriesActions";
import s from "./AdminAddProduct.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import DotsLoader from "../../Loader/DotsLoader";

export const AdminAddProduct = (props) => {
    const [render, setRender] = useState(false);
    if (!render) {
        props.loadCategorylist();
        setRender(true);
    }

    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [btnState, setBtnState] = useState(false);

    useEffect(() => {
        if (
            (name.length > 0,
            category.length > 0,
            price.length > 0,
            desc.length > 0)
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
                <img src={imageUrl ? imageUrl : "/image/emptyimg.svg"} alt="" />
                <label htmlFor={s.file} className={s.fileLabel}>
                    <AiOutlineCloudUpload /> Upload new photo
                </label>
                <input
                    type="file"
                    value={image}
                    onChange={(e) => {
                        setImage(e.target.value);
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                        setImageFile(e.target.files[0]);
                    }}
                    id={s.file}
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
                        <option
                            key={el.id}
                            value={el.name}
                            className={s.option}
                        >
                            {el.name[0].toUpperCase() +
                                el.name.substring(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            <div className={`${s.formItem} ${s.desc}`}>
                <label>Description</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>
            </div>
            <div
                className={`${s.btn} ${btnState ? s.btnActive : ""}`}
                onClick={() => {
                    props.addProd(
                        name,
                        category,
                        desc,
                        price,
                        image,
                        imageFile
                    );
                    setName("");
                    setCategory("");
                    setDesc("");
                    setImage("");
                    setImageUrl("");
                    setPrice("")
                    setBtnState(false);
                }}
            >
                ADD
            </div>
            {props.loading && (
                <div className={s.loaderWrapper}>
                    <DotsLoader />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.admin.loading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategorylist: () => dispatch(loadCategories()),
        addProd: (name, category, desc, price, imglink, imgFile) =>
            dispatch(
                addAdminProduct(name, category, desc, price, imglink, imgFile)
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct);
