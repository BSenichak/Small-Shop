import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../store/header/headerActions";
import OrderItem from "./OrderItem";
import s from "./OrderPage.module.css";
import OrderSuccess from "./OrderSuccess";
import { userOrdering } from "../../store/order/orderActions";

export const OrderPage = (props) => {
  useEffect(() => {
    fetch("ua.json")
      .then((res) => res.json())
      .then((res) => setAdrs(res.map((el) => el.city)));
  }, []);
  const [adrs, setAdrs] = useState([]);

  const [overlay, setOverlay] = useState(false);

  const [userData, setUserData] = useState({
    fn: "",
    sn: "",
    mn: "",
    em: "",
    city: "",
    street: "",
    houseNumber: "",
    floorNumber: "",
    postalCode: "",
  });
  const [render, setRender] = useState(true);

  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    if (render) {
      setUserData({
        ...userData,
        fn: props.userData?.firstName,
        sn: props.userData?.secondName,
        mn: props.userData?.phoneNumber,
        city: props.userData?.homeCity,
        street: props.userData?.homeStreet,
        houseNumber: props.userData?.homehouse,
        floorNumber: props.userData?.homeflat,
        postalCode: props.userData?.postNumber,
        em: props.userEmail,
      });
      setRender(false);
    }
    if (userData.fn) {
      if (
        userData.fn.length > 2 &&
        userData.sn.length > 2 &&
        userData.mn.length > 2 &&
        userData.em.length > 2 &&
        userData.city.length > 0 &&
        userData.street.length > 0 &&
        userData.houseNumber.length > 0 &&
        userData.floorNumber.length > 0 &&
        userData.postalCode.length > 4
      ) {
        setBtnState(true);
      } else {
        setBtnState(false);
      }
    }
  }, [userData, props.userData, render, props.userEmail]);

  return (
    <div className={s.wrapper}>
      {overlay&&<OrderSuccess/>}
      <div className={s.title}>Ordering</div>
      <section className={s.contactData}>
        <div className={s.sectionTitle}>Contacts</div>
        <div className={s.formItem}>
          <label htmlFor={s.firstName}>First name</label>
          <input
            type="text"
            id={s.firstName}
            value={userData.fn}
            onChange={(e) => setUserData({ ...userData, fn: e.target.value })}
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.secondName}>Second name</label>
          <input
            type="text"
            id={s.secondName}
            value={userData.sn}
            onChange={(e) => setUserData({ ...userData, sn: e.target.value })}
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.mobileNumber}>Mobile Number</label>
          <input
            type="text"
            id={s.mobileNumber}
            value={userData.mn}
            onChange={(e) => setUserData({ ...userData, mn: e.target.value })}
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.email}>Email</label>
          <input
            type="text"
            id={s.email}
            value={userData.em}
            onChange={(e) => setUserData({ ...userData, em: e.target.value })}
          />
        </div>
      </section>
      <section className={s.products}>
        <div className={s.sectionTitle}>Products</div>
        {props.cartItems.map((el) => (
          <OrderItem key={el.id} el={el} />
        ))}
      </section>
      <section className={s.delivery}>
        <div className={s.sectionTitle}>Delivery</div>
        <div className={s.formItem}>
          <label htmlFor={"city"}>City/Town</label>
          <input
            type="text"
            list={"datalist"}
            id="city"
            value={userData.city}
            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          />
          <datalist id={"datalist"}>
            {adrs.map((el) => (
              <option key={Math.random() * 99999999} value={el}>
                {el}
              </option>
            ))}
          </datalist>
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.street}>Street</label>
          <input
            type="text"
            id={s.street}
            value={userData.street}
            onChange={(e) =>
              setUserData({ ...userData, street: e.target.value })
            }
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.houseNumber}>House number</label>
          <input
            type="text"
            id={s.houseNumber}
            value={userData.houseNumber}
            onChange={(e) =>
              setUserData({ ...userData, houseNumber: e.target.value })
            }
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.floorNumber}>Floor number</label>
          <input
            type="text"
            id={s.floorNumber}
            value={userData.floorNumber}
            onChange={(e) =>
              setUserData({ ...userData, floorNumber: e.target.value })
            }
          />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.postalCode}>Postal code</label>
          <input
            type="text"
            id={s.postalCode}
            value={userData.postalCode}
            onChange={(e) =>
              setUserData({ ...userData, postalCode: e.target.value })
            }
          />
        </div>
      </section>
      <section>
        <div className={s.sectionTitle}>Payment</div>
        <label htmlFor="">Payment upon receipt of goods</label>
      </section>
      <section>
        <div className={s.sectionTitle}>Summary</div>
        <div className={s.summ}>
          For payment: $
          {props.cartItems.reduce(
            (total, el) => total + el.count * el.price,
            0
          )}{" "}
          + $5 delivery
        </div>
        <div
          className={`${s.btn} ${btnState ? s.btnOk : s.btnNotOk}`}
          onClick={() => {
            if (btnState) {
              props.order(userData, props.cartItems, props.userUUID);
              setOverlay(true)
            }
          }}
        >
          Order
        </div>
        <div className={s.errors}>
          {userData.fn?.length < 3 && (
            <a href={`#${s.firstName}`} className={s.error}>
              First name lenght less than 3 letters
            </a>
          )}
          {userData.sn?.length < 3 && (
            <a href={`#${s.secondName}`} className={s.error}>
              Second name lenght less than 3 letters
            </a>
          )}
          {userData.mn?.length < 7 && (
            <a href={`#${s.mobileNumber}`} className={s.error}>
              Mobile number lenght less than 8 letters
            </a>
          )}
          {userData.em?.length < 3 && (
            <a href={`#${s.email}`} className={s.error}>
              Email lenght less than 3 letters
            </a>
          )}
          {userData.city?.length < 1 && (
            <a href={`#${s.city}`} className={s.error}>
              City lenght less than is empty
            </a>
          )}
          {userData.street?.length < 3 && (
            <a href={`#${s.street}`} className={s.error}>
              Street lenght less than 3 letters
            </a>
          )}
          {userData.houseNumber?.length < 1 && (
            <a href={`#${s.houseNumber}`} className={s.error}>
              House number lenght is empty
            </a>
          )}
          {userData.floorNumber?.length < 1 && (
            <a href={`#${s.floorNumber}`} className={s.error}>
              Floor number lenght is empty
            </a>
          )}
          {userData.postalCode?.length < 5 && (
            <a href={`#${s.postalCode}`} className={s.error}>
              Postal code is not correct
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state?.header?.cart.sort((a, b) => a.order - b.order),
  userData: state?.account?.fullData,
  userEmail: state?.account?.data?.email,
  userUUID: state?.account?.uuid,

});

const mapDispatchToProps = (dispatch) => {
  return {
    order: (user, products, userUUID) => {
      dispatch(userOrdering(user, products, userUUID))
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
