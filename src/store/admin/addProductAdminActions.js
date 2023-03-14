import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../plagins/firebase";

export const START_ADD_ADMIN_PRODUCT = "START_ADD_ADMIN_PRODUCT";
export const FAILED_ADD_ADMIN_PRODUCT = "FAILED_ADD_ADMIN_PRODUCT";
export const SUCCESS_ADD_ADMIN_PRODUCT = "SUCCESS_ADD_ADMIN_PRODUCT";

export const addAdminProduct = (
  name,
  category,
  desc,
  price,
  imglink,
  imgFile
) => {
  return (dispatch) => {
    dispatch(startAddAdminProduct());
    addDoc(collection(db, "products"), {
      id: new Date().getTime(),
      name,
      category,
      img: `${name.replace(/ /g, "")}${imglink.substring(
        imglink.indexOf(".")
      )}`,
      desc,
      price,
    })
      .then(() => {
        if (imglink) {
          uploadBytes(
            ref(
              storage,
              `products/${category.replace(/ /g, "")}/${name.replace(
                / /g,
                ""
              )}${imglink.substring(imglink.indexOf("."))}`
            ),
            imgFile,
            {
              contentType: `image/${imglink.substring(
                imglink.indexOf(".") + 1
              )}`,
            }
          ).then((d)=>console.log(d)).catch(err=>console.error(err))
        }
        dispatch(successAddAdminProduct());
      })
      .catch((err) => dispatch(failedAddAdminProduct(err)));
  };
};

export const startAddAdminProduct = () => {
  return {
    type: START_ADD_ADMIN_PRODUCT,
  };
};

export const failedAddAdminProduct = (err) => {
  return {
    type: FAILED_ADD_ADMIN_PRODUCT,
    payload: err,
  };
};

export const successAddAdminProduct = () => {
  return {
    type: SUCCESS_ADD_ADMIN_PRODUCT,
  };
};
