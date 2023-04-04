import React from "react";
import { connect } from "react-redux";
import s from "./AdminOrders.module.scss";
import { Link, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdminStartOrders from "./AdminOrdersPages/AdminStartOrders";
import AdminSendedOrders from "./AdminOrdersPages/AdminSendedOrders";
import AdminFinishedOrder from "./AdminOrdersPages/AdminFinishedOrder";

export const AdminOrders = (props) => {
  const currentLink = useLocation().pathname.substring(14);
  return (
    <div className={s.wrapper}>
      <div className={s.nav}>
        <Link to="start" className={currentLink === "start" ? s.active: ""}>
          Start
        </Link>
        <Link to="sended" className={currentLink === "sended" ? s.active: ""}>
          Sended
        </Link>
        <Link to="finished" className={currentLink === "finished" ? s.active: ""}>
          Finished
        </Link>
      </div>
      <div className={s.content}>
        <Routes>
            <Route path="start" element={<AdminStartOrders/>}/>
            <Route path="sended" element={<AdminSendedOrders/>}/>
            <Route path="finished" element={<AdminFinishedOrder/>}/>
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
