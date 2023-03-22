import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    adminDeletePrduct,
    adminSearchProduct,
    adminUpdateProduct,
} from "../../../store/admin/adminManageProductsActions";
import { adminLoadCategories } from "../../../store/admin/adminCategoryManageActions";
import Loader from "../../Loader/DotsLoader";
import { AiOutlineCloudUpload } from "react-icons/ai";

import s from "./AdminProductsManage.module.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../plagins/firebase";

export const AdminProductsManage = (props) => {
    const [search, setSearch] = useState("");
    const [choseProduct, setChoseProduct] = useState(null);
    const [render, setRender] = useState(true);
    const [imgUrl, setImgUrl] = useState("");
    const [imgLoading, setImgLoading] = useState(true);
    const [imgChange, setImgChange] = useState(false);
    const [newImg, setNewImg] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");
    const [newImgFile, setNewImgFile] = useState(undefined);
    const [confState, setConfState] = useState(false);

    if (render) {
        props.loadCategories();
        setRender(false);
    }
    useEffect(() => {
        choseProduct !== null &&
            getDownloadURL(
                ref(
                    storage,
                    "products/" +
                        choseProduct.category.replace(/ /g, "") +
                        "/" +
                        choseProduct?.img
                )
            ).then((res) => setImgUrl(res));
    }, [choseProduct, imgChange]);
    return (
        <div className={s.wrapper}>
            <div className={s.searchBar}>
                <h1>Search product</h1>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        props.searchChange(e.target.value);
                    }}
                    className={s.input}
                />
                <ul className={s.searchList}>
                    {search !== ""
                        ? props.results.map((el) => (
                              <li
                                  key={el.id}
                                  onClick={() => {
                                      setSearch("");
                                      setChoseProduct(el);
                                      setImgLoading(true);
                                      setNewImg("");
                                      setNewImgUrl("");
                                      setImgChange(false);
                                  }}
                              >
                                  {el.name}
                              </li>
                          ))
                        : ""}
                </ul>
            </div>
            {choseProduct !== null && (
                <div className={s.productWrapper}>
                    <input
                        type="text"
                        value={choseProduct.name}
                        onChange={(e) =>
                            setChoseProduct({
                                ...choseProduct,
                                name: e.target.value,
                            })
                        }
                        className={s.input}
                    />
                    <input
                        type="text"
                        value={choseProduct.price}
                        onChange={(e) =>
                            setChoseProduct({
                                ...choseProduct,
                                price: e.target.value,
                            })
                        }
                        className={s.input}
                    />
                    <textarea
                        value={choseProduct.desc ? choseProduct.desc : ""}
                        onChange={(e) =>
                            setChoseProduct({
                                ...choseProduct,
                                desc: e.target.value,
                            })
                        }
                        rows={4}
                        className={s.input}
                    ></textarea>
                    <select
                        value={choseProduct.category}
                        onChange={(e) =>
                            setChoseProduct({
                                ...choseProduct,
                                category: e.target.value,
                            })
                        }
                        className={s.input}
                    >
                        {props.categories.map((el) => (
                            <option key={el.id}>{el.name}</option>
                        ))}
                    </select>
                    <div className={s.imgBar}>
                        {imgChange && <p>Old Image</p>}
                        {imgLoading && <Loader />}
                        <img
                            src={imgUrl}
                            alt="prod"
                            onLoad={() => setImgLoading(false)}
                            style={imgLoading ? { display: "none" } : {}}
                        />
                        {imgChange && <p>New Image</p>}
                        {newImg && <img src={newImgUrl} alt="newImg" />}
                        <label htmlFor={s.file} className={s.fileLabel}>
                            <AiOutlineCloudUpload /> Upload new photo
                        </label>
                        <input
                            type="file"
                            onChange={(e) => {
                                setNewImg(e.target.value);
                                setNewImgUrl(
                                    URL.createObjectURL(e.target.files[0])
                                );
                                setImgChange(true);
                                setNewImgFile(e.target.files[0]);
                            }}
                            id={s.file}
                        />
                    </div>
                    <div
                        className={s.btn}
                        onClick={() => {
                            console.log(
                                choseProduct,
                                imgChange
                                    ? newImg.substring(
                                          newImg.lastIndexOf("\\") + 1
                                      )
                                    : null,
                                newImgFile
                            );
                            props.updateProduct(
                                choseProduct,
                                imgChange
                                    ? newImg.substring(
                                          newImg.lastIndexOf("\\") + 1
                                      )
                                    : null,
                                newImgFile
                            );
                            setChoseProduct(null);
                            setImgChange(false);
                        }}
                    >
                        SAVE
                    </div>
                    <div
                        className={`${s.btn} ${s.btnDel}`}
                        onClick={() => setConfState(true)}
                    >
                        DELETE
                    </div>
                </div>
            )}
            {confState && (
                <div className={s.conWrapper}>
                    <div className={s.confWindow}>
                        <div className={s.confTitle}>Confirm delete action</div>
                        <div
                            className={s.btn}
                            onClick={() => setConfState(false)}
                        >
                            CANCEL
                        </div>
                        <div
                            className={`${s.btn} ${s.btnDel}`}
                            onClick={() => {
                                setConfState(false);
                                props.deleteProduct(choseProduct.uuid, choseProduct.img, choseProduct.category);
                                setChoseProduct(null);
                            }}
                        >
                            DELETE
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    results: state?.admin?.searchResults,
    categories: state?.admin?.categories,
});

const mapDispatchToProps = (dispatch) => {
    return {
        searchChange: (str) => dispatch(adminSearchProduct(str)),
        loadCategories: () => dispatch(adminLoadCategories()),
        updateProduct: (data, img, file) =>
            dispatch(adminUpdateProduct(data, img, file)),
        deleteProduct: (uuid, img, category) =>
            dispatch(adminDeletePrduct(uuid, img, category)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProductsManage);
