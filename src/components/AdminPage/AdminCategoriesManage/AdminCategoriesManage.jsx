import React, { useState } from "react";
import { connect } from "react-redux";
import {
    adminAddNewCategory,
    adminLoadCategories,
    adminUpdateCategories,
} from "../../../store/admin/adminCategoryManageActions";
import s from "./AdminCategoriesManage.module.css";
import AdminCategoryesItem from "./AdminCategoryesItem";
import Loader from "../../Loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";

export const AdminCAtegoriesManage = (props) => {
    const [render, setRender] = useState(true);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState("");
    if (render) {
        props.loadCategories();
        setRender(false);
    }

    return (
        <div className={s.wrapper}>
            {props.categories.map((el) => (
                <AdminCategoryesItem key={el.id} data={el} />
            ))}
            <div
                className={s.btn}
                onClick={() => props.save(props.categories, props.del)}
            >
                SAVE
            </div>
            <div className={s.adding}>
                <div className={s.formItem}>
                    <label>New category name (lower case)</label>
                    <input
                        type="text"
                        className={s.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={`${s.formItem} ${s.image}`}>
                    <img
                        src={imageUrl ? imageUrl : "/image/emptyimg.svg"}
                        alt=""
                    />
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
                <div
                    className={s.addBtn}
                    onClick={() => {
                        props.add(
                            props.categories.length,
                            name,
                            image,
                            imageFile
                        );
                        setName("");
                        setImage("");
                        setImageUrl("");
                    }}
                >
                    ADD
                </div>
            </div>
            {props.loading && (
                <div className={s.loaderWrapper}>
                    <Loader />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state?.admin?.categories,
    del: state?.admin?.deleteCateg,
});

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(adminLoadCategories()),
        save: (cat, del) => dispatch(adminUpdateCategories(cat, del)),
        add: (id, name, imgLink, imgFile) =>
            dispatch(adminAddNewCategory(id, name, imgLink, imgFile)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminCAtegoriesManage);
