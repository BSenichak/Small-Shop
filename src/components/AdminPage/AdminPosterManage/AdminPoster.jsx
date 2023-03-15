import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { storage } from "../../../plagins/firebase";
import Loader from "../../Loader/Loader";
import s from "./AdminPosterManage.module.css";
import { AiOutlineDelete, AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai"
import { adminDeletePoster, adminMoveDownPoster, adminMoveUpPoster} from "../../../store/admin/adminPosterManageActions"

export const AdminPoster = (props) => {
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  useEffect(() => {
    getDownloadURL(ref(storage, `posters/${props?.data?.link}`)).then((link) =>
      setImg(link)
    );
  });
  return (
    <div className={s.item}>
      <div>{props.data.id}</div>
      <div>{props.data.bgc}</div>
      <div className={s.posterBox}>
        {imgLoading && <Loader />}
        <img
          src={img}
          alt={`poster${props?.data?.id}`}
          style={imgLoading ? { display: "none" } : {}}
          onLoad={() => setImgLoading(false)}
        />
      </div>
      <AiOutlineDelete onClick={()=>props.delete(props.data.id)}/>
      <div className={s.arrows}>
        <AiOutlineUpCircle onClick={()=>props.moveUp(props.data.id)}/>
        <AiOutlineDownCircle onClick={()=>props.moveDown(props.data.id)}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    moveUp: (id)=>dispatch(adminMoveUpPoster(id)),
    moveDown: (id)=>dispatch(adminMoveDownPoster(id)),
    delete: (id)=>dispatch(adminDeletePoster(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPoster);
