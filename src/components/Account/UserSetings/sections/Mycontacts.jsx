import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateUserContactData } from "../../../../store/account/setings/setingActions";
import s from "../UserSetings.module.css";

export const Mycontacts = (props) => {
  const dispatch = useDispatch();
  const fullData = useSelector((state) => state.account.fullData);

  useEffect(()=>{
    setMobileNumber(fullData?.phoneNumber)
    sethomeCity(fullData?.homeCity)
    sethomeStreet(fullData?.homeStreet)
    sethomehouse(fullData?.homehouse)
    sethomeflat(fullData?.homeflat)
    setpostCity(fullData?.postCity)
    setpostNumber(fullData?.postNumber)
  },[fullData])

  const [mobileNumber, setMobileNumber] = useState("");
  const [homeCity, sethomeCity] = useState("");
  const [homeStreet, sethomeStreet] = useState("");
  const [homehouse, sethomehouse] = useState("");
  const [homeflat, sethomeflat] = useState("");
  const [postCity, setpostCity] = useState("");
  const [postNumber, setpostNumber] = useState("");
  const [btnState, setBtnState] = useState(false);

  const uuid = useSelector((state) => state.account.uuid);

  const validation = (e) => {
    let val = e.target.value;
    if (val.length <= 3) {
      e.target.style.borderColor = "red";
      setBtnState(false);
    } else {
      e.target.style.borderColor = "green";
      setBtnState(true);
    }
    return val;
  };

  return (
    <div className={s.contactWrapper}>
      <h2 className={s.titleSection}>My phone</h2>
      <div className={s.homeAddressWrapper}>
        <div className={s.formItem}>
          <span>Mobile number</span>
          <input
            type="text"
            className={s.input}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(validation(e))}
          />
        </div>
      </div>
      <h2 className={s.titleSection}>My home address</h2>
      <div className={s.homeAddressWrapper}>
        <div className={s.formItem}>
          <span>City</span>
          <input
            type="text"
            className={s.input}
            value={homeCity}
            onChange={(e) => sethomeCity(validation(e))}
          />
        </div>
        <div className={s.formItem}>
          <span>Street</span>
          <input
            type="text"
            className={s.input}
            value={homeStreet}
            onChange={(e) => sethomeStreet(validation(e))}
          />
        </div>
        <div className={s.formItem}>
          <span>House</span>
          <input
            type="text"
            className={s.input}
            value={homehouse}
            onChange={(e) => sethomehouse(validation(e))}
          />
        </div>
        <div className={s.formItem}>
          <span>Flat</span>
          <input
            type="text"
            className={s.input}
            value={homeflat}
            onChange={(e) => sethomeflat(validation(e))}
          />
        </div>
      </div>
      <h2 className={s.titleSection}>My nearest post office</h2>
      <div className={s.homeAddressWrapper}>
        <div className={s.formItem}>
          <span>City</span>
          <input
            type="text"
            className={s.input}
            value={postCity}
            onChange={(e) => setpostCity(validation(e))}
          />
        </div>
        <div className={s.formItem}>
          <span>Branch number</span>
          <input
            type="text"
            className={s.input}
            value={postNumber}
            onChange={(e) => setpostNumber(validation(e))}
          />
        </div>
      </div>
      <div
        className={`${s.btn} ${btnState ? s.activeBtn : ""}`}
        onClick={
          btnState
            ? () =>
                dispatch(
                  updateUserContactData(
                    uuid,
                    mobileNumber,
                    homeCity,
                    homeStreet,
                    homehouse,
                    homeflat,
                    postCity,
                    postNumber
                  )
                )
            : null
        }
      >
        SAVE
      </div>
    </div>
  );
};

export default connect()(Mycontacts);
