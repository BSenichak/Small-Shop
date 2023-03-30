import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import s from "./OrderPage.module.css";

export const OrderPage = (props) => {
  useEffect(()=>{
    fetch("ua.json")
    .then(res=>res.json())
    .then(res=>setAdrs(res))
  },[])
  const [adrs, setAdrs] = useState({})
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Ordering</div>
      <section className={s.contactData}>
        <div className={s.sectionTitle}>Contacts</div>
        <div className={s.formItem}>
          <label htmlFor={s.firstName}>First name</label>
          <input type="text" id={s.firstName} />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.secondName}>Second name</label>
          <input type="text" id={s.secondName} />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.mobileNumber}>Mobile Number</label>
          <input type="text" id={s.mobileNumber} />
        </div>
        <div className={s.formItem}>
          <label htmlFor={s.email}>Email</label>
          <input type="text" id={s.email} />
        </div>
      </section>
      <section className={s.products}>
        <div className={s.sectionTitle}>Products</div>
        {props.cartItems.map((el) => (
          <OrderItem key={el.id} el={el}/>
        ))}
      </section>
      <section className={s.delivery}>
          <div className={s.sectionTitle}>Delivery</div>
          <select>
            {adrs.map(el=><option key={el.city}>{el.city}</option>)}
          </select>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state?.header?.cart.sort((a, b) => a.order - b.order),
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
