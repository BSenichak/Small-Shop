import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import s from "../UserSetings.module.css";
import { useSelector } from "react-redux";
import { updateUserPersonalInfo } from "../../../../store/account/setings/setingActions";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../plagins/firebase";
import DotsLoader from "../../../Loader/DotsLoader";

export const Personalinfo = (props) => {
  const dispatch = useDispatch();
  const fullData = useSelector((state) => state.account.fullData);
  const uuid = useSelector((state) => state.account.uuid);
  const loading = useSelector((state) => state.account.loading);
  const load = useSelector((state) => state.setings.loading);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [imgfile, setImgFile] = useState("");
  const [secondname, setSecondname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [btnState, setBtnState] = useState(false);
  const [currentimg, setCurrentimg] = useState("");
  const [imgLoading, setImgLoading] = useState(true);

  const nameChange = (e) => {
    setName(e.target.value);
    let str = e.target.value;
    if (str.length < 3) {
      e.target.style.borderColor = "red";
      setBtnState(false);
    } else {
      e.target.style.borderColor = "green";
      setBtnState(true);
    }
  };

  const secondnameChange = (e) => {
    setSecondname(e.target.value);
    let str = e.target.value;
    if (str.length < 3) {
      e.target.style.borderColor = "red";
      setBtnState(false);
    } else {
      e.target.style.borderColor = "green";
      setBtnState(true);
    }
  };

  const middlenameChange = (e) => {
    setMiddlename(e.target.value);
    let str = e.target.value;
    if (str.length < 3) {
      e.target.style.borderColor = "red";
      setBtnState(false);
    } else {
      e.target.style.borderColor = "green";
      setBtnState(true);
    }
  };

  const dobChange = (e) => {
    setDOB(e.target.value);
    e.target.style.borderColor = "green";
    setBtnState(true);
  };

  const genderChange = (e) => {
    setGender(e.target.value);
    e.target.style.borderColor = "green";
    setBtnState(true);
  };

  useEffect(() => {
    setName(fullData?.firstName);
    setSecondname(fullData?.secondName);
    setCurrentimg(fullData?.img);
    fullData?.middlename && setMiddlename(fullData?.middlename);
    fullData?.dob && setDOB(fullData?.dob);
    fullData?.gender && setGender(fullData?.gender);
    getDownloadURL(ref(storage, `userphoto/${fullData?.img}`)).then((url) =>
      setCurrentimg(url)
    );
  }, [fullData]);

  return (
    <div className={s.personalWrapper}>
      <div className={s.imagebar}>
        {!loading && (
          <img
            src={
              fullData?.img !== null && fullData !== null
                ? currentimg
                : "/image/user.svg"
            }
            style={imgLoading ? { display: "none" } : {}}
            alt="sss"
            onLoad={() => setImgLoading(false)}
          />
        )}
        <div className={s.imgDesc}>
          <p>
            You can only set a picture profile in gif png or jpeg formats. The
            image size must be greater than 100x100 px and not more than
            1000x1000 px.
          </p>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
              setImgFile(e.target.files[0]);
              setBtnState(true);
            }}
          />
        </div>
      </div>
      <div className={s.namingBar}>
        <div>
          Name:
          <input
            type="text"
            className={s.input}
            value={name}
            onChange={(e) => nameChange(e)}
          />
        </div>
        <div>
          Secondname:
          <input
            type="text"
            className={s.input}
            value={secondname}
            onChange={(e) => secondnameChange(e)}
          />
        </div>
        <div>
          Patronymic/Middlename
          <input
            type="text"
            className={s.input}
            value={middlename}
            onChange={(e) => middlenameChange(e)}
          />
        </div>
        <div>
          Date of birth
          <input
            type="date"
            className={s.input}
            value={dob}
            onChange={(e) => dobChange(e)}
          />
        </div>
        <div>
          Gender
          <select
            className={s.input}
            value={gender}
            onChange={(e) => genderChange(e)}
          >
            <option value="null">--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div
        className={`${s.btn} ${btnState ? s.activeBtn : ""}`}
        onClick={() => {
          dispatch(
            updateUserPersonalInfo(
              img,
              imgfile,
              fullData.uid,
              uuid,
              img !== "",
              name,
              secondname,
              middlename,
              dob,
              gender
            )
          );
          setBtnState(false);
          [...document.getElementsByClassName(s.input)].forEach((element) => {
            element.style.borderColor = "var(--primary-color)";
          });
        }}
      >
        SAVE
      </div>
      {load && (
        <div className={s.loaderWrapper}>
          <DotsLoader />
        </div>
      )}
    </div>
  );
};

export default connect()(Personalinfo);
