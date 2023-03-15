import React, { useState } from "react";
import { connect } from "react-redux";
import {
  adminPosterLoad,
  adminUpdatePosters,
} from "../../../store/admin/adminPosterManageActions";
import AdminPoster from "./AdminPoster";
import s from "./AdminPosterManage.module.css";

export const AdminPosterManage = (props) => {
  const [render, setRender] = useState(true);
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState("");

  if (render) {
    props.loadPosters();
    setRender(false);
  }
  return (
    <div className={s.wrapper}>
      {props.posters.map((el) => (
        <AdminPoster key={el.id} data={el} />
      ))}
      <div
        className={s.btn}
        onClick={() => props.updatePosters(props.posters, props.del)}
      >
        SAVE
      </div>
      <div className={s.adding}>
        <div className={s.formItem}>
          <label>Poster background color</label>
          <input
            type="text"
            className={s.input}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className={`${s.formItem} ${s.image}`}>
          <img src={imageUrl ? imageUrl : "/image/emptyimg.svg"} alt="" />
          <input
            type="file"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
            }}
          />
        </div>
        <div className={s.addBtn}>ADD</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posters: state?.admin?.posters,
  del: state?.admin?.delete,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosters: () => dispatch(adminPosterLoad()),
    updatePosters: (posters, del = []) =>
      dispatch(adminUpdatePosters(posters, del)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPosterManage);
