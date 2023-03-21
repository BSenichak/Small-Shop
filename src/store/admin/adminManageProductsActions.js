import {
    collection,
    doc,
    endAt,
    getDocs,
    limit,
    orderBy,
    query,
    startAt,
    updateDoc,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../plagins/firebase";

export const START_ADMIN_SEARCH_PRODUCT = "START_ADMIN_SEARCH_PRODUCT";
export const FAILED_ADMIN_SEARCH_PRODUCT = "FAILED_ADMIN_SEARCH_PRODUCT";
export const SUCCESS_ADMIN_SEARCH_PRODUCT = "SUCCESS_ADMIN_SEARCH_PRODUCT";

export const adminSearchProduct = (str) => {
    return (dispatch) => {
        dispatch(startAdminSearchProduct());
        const result = [];
        getDocs(
            query(
                collection(db, "products"),
                orderBy("name"),
                startAt(str),
                endAt(str + "\uf8ff"),
                limit(10)
            )
        )
            .then((res) => {
                res.forEach((el) => {
                    let product = el.data();
                    product.uuid = el.id;
                    result.push(product);
                });
                dispatch(successAdminSearchProduct(result));
            })
            .catch((err) => {
                dispatch(failedAdminSearchProduct(err));
            });
    };
};

export const startAdminSearchProduct = () => {
    return {
        type: START_ADMIN_SEARCH_PRODUCT,
    };
};

export const failedAdminSearchProduct = (err) => {
    return {
        type: FAILED_ADMIN_SEARCH_PRODUCT,
        payload: err,
    };
};

export const successAdminSearchProduct = (data) => {
    return {
        type: SUCCESS_ADMIN_SEARCH_PRODUCT,
        payload: data,
    };
};

export const START_ADMIN_UPDATE_PRODUCT = "START_ADMIN_UPDATE_PRODUCT";
export const FAILED_ADMIN_UPDATE_PRODUCT = "FAILED_ADMIN_UPDATE_PRODUCT";
export const SUCCESS_ADMIN_UPDATE_PRODUCT = "SUCCESS_ADMIN_UPDATE_PRODUCT";

export const adminUpdateProduct = (data, newImg, imgFile) => {
    return (dispatch) => {
        dispatch(startAdminUpdateProduct());
        updateDoc(doc(db, "products", data.uuid), {
            name: data.name,
            price: data.price,
            desc: data.desc,
            categoty: data.category,
            id: data.id,
            img: newImg ? newImg : data.img,
        })
            .then(() => {
                if (newImg) {
                    deleteObject(
                        ref(
                            storage,
                            "products/" +
                                data.category.replace(/ /g, "") +
                                "/" +
                                data.img
                        )
                    );
                    uploadBytes(
                        ref(
                            storage,
                            "products/" +
                                data.category.replace(/ /g, "") +
                                "/" +
                                newImg
                        ),
                        imgFile,
                        {
                            contentType: `image/${newImg.substring(
                                newImg.indexOf(".") + 1
                            )}`,
                        }
                    ).catch((err) => dispatch(failedAdminUpdateProduct(err)));
                }
                dispatch(successAdminUpdateProduct());
            })
            .catch((err) => dispatch(failedAdminUpdateProduct(err)));
    };
};

export const startAdminUpdateProduct = () => {
    return {
        type: START_ADMIN_UPDATE_PRODUCT,
    };
};

export const failedAdminUpdateProduct = (err) => {
    return {
        type: FAILED_ADMIN_UPDATE_PRODUCT,
        payload: err,
    };
};

export const successAdminUpdateProduct = () => {
    return {
        type: SUCCESS_ADMIN_UPDATE_PRODUCT,
    };
};
