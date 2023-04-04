import React from 'react'
import { connect } from 'react-redux'
import s from "../AdminOrders.module.scss"
import { useState } from 'react'
import { adminLoadOrders } from "../../../../store/admin/adminOrder/adminOrderActions";
import AOrderElement from "./AOrderElement";

export const AdminFinishedOrder = (props) => {
  const [render, setRender] = useState(true);
  if (render) {
    props.loadOrders("finished");
    setRender(false);
  }

  return (
    <div className={s.itemWrapper}>
      {props.orders.map((el) => (
        <AOrderElement data={el} key={el.uuid}/>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.adminOrder?.loading,
  orders: state.adminOrder?.orders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (status) => dispatch(adminLoadOrders(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminFinishedOrder)