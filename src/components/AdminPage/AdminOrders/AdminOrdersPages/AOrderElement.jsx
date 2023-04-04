import React, { useState } from "react";
import { connect } from "react-redux";
import s from "../AdminOrders.module.scss";
import { BiDownArrow } from "react-icons/bi";
import {
  getSingleOrderProducts,
  setOpenOrder,
} from "../../../../store/admin/adminOrder/adminOrderActions";
import { Link } from "react-router-dom";

export const AOrderElement = (props) => {
    const [stat, setStat] = useState("")
    const [render, setRender] = useState(true)
    if(render){
        setStat(props.data.status)
        setRender(false)
    }
  return (
    <div
      className={`${s.item} ${
        props.openOrder === props.data.uuid && s.notWraped
      }`}
    >
      <div className={s.titleBar}>
        <div className={s.data}>
          {new Date(props.data.data).toLocaleDateString()}{" "}
          {new Date(props.data.data).toLocaleTimeString()}
        </div>
        <div className={s.name}>{props.data.uuid}</div>
        <BiDownArrow
          className={props.openOrder === props.data.uuid ? s.arrowUp : ""}
          onClick={() => {
            props.openOrder !== props.data.uuid
              ? props.setOpenOrder(props.data.uuid)
              : props.setOpenOrder(0);
            props.openOrder !== props.data.uuid &&
              props.loadProducts(props.data.products);
          }}
        />
      </div>
      {props.openOrder === props.data.uuid && (
        <div className={s.content}>
          <div className={s.contacts}>
            <div>City: {props.data.contacts.city}</div>
            <div>Street: {props.data.contacts.street}</div>
            <div>House: {props.data.contacts.houseNumber}</div>
            <div>Flat: {props.data.contacts.floorNumber}</div>
            <div>Postal code: {props.data.contacts.postalCode}</div>
            <div>
              Full name: {props.data.contacts.fn} {props.data.contacts.sn}
            </div>
            <div>Mobile number: {props.data.contacts.mn}</div>
            <div>Email: {props.data.contacts.em}</div>
          </div>
          <div className={s.products}>
            {!props.loading &&
              props.products.map((el) => (
                <Link to={`/product/${el.category}/${el.id}`} key={el.id} className={s.link}>
                  <div>Name: {el.name}</div>
                  <div>Count: {props.data.products.filter((i) => i.id === el.uuid)[0]?.count} </div>
                </Link>
              ))}
          </div>
          <div className={s.btnBar}>
          <select value={stat} onChange={(e)=>setStat(e.target.value)}>
            <option value="start" >Start</option>
            <option value="sended">Sended</option>
            <option value="Finished">Finished</option>
          </select>
          <div className={s.btn}>Save</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.adminOrder?.products,
  openOrder: state.adminOrder?.openOrder,
  loading: state.adminOrder?.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: (arr) => dispatch(getSingleOrderProducts(arr)),
    setOpenOrder: (id) => dispatch(setOpenOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AOrderElement);
