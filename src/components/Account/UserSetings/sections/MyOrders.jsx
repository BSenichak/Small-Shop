import React, { useState } from "react";
import { connect } from "react-redux";
import s from "./MyOrders.module.scss";
import { userLoadOrders } from "../../../../store/account/setings/setingActions";
import { BiDownArrow } from "react-icons/bi";
import { getSingleOrderProducts } from "../../../../store/admin/adminOrder/adminOrderActions";
import { Link } from "react-router-dom";

export const MyOrders = (props) => {
  const [render, setRender] = useState(true);
  if (render) {
    props.loadOrders(props.userId);
    setRender(false);
  }
  const [openOrder, setOpenOrder] = useState("");
  return (
    <div className={s.wrapper}>
      <h1>My orders</h1>
      <div className="list">
        {props.orders.map((el) => (
          <div className={s.orderItem}>
            <div className={s.title}>
              <div className={s.orderId}>#{el.uuid}</div>
              <div className={s.ordertime}>
                {new Date(el.data)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}{" "}
                {new Date(el.data).toTimeString().substring(0, 8)}
              </div>
              <div className={s.orderStatus}>
                Order status: {el.status[0].toUpperCase() + el.status.substring(1)}
              </div>
              <BiDownArrow
                onClick={() => {
                  openOrder === el.uuid
                    ? setOpenOrder("")
                    : setOpenOrder(el.uuid);
                  props.getProducts(el.products);
                }}
              />
            </div>
            {openOrder === el.uuid && (
              <div className={s.products}>
                {!props.prodLoad && props.products.map((elem) => (
                  <Link
                    to={`/product/${elem.category}/${elem.id}`}
                    key={elem.id}
                    className={s.link}
                  >
                    <div>{elem.name}</div>
                    <div>
                      Count:{" "}
                      {el.products.filter((i) => i.id === elem.uuid)[0]?.count}{" "}
                    </div>
                    <div>
                      ${elem.price * Number(el.products.filter((i) => i.id === elem.uuid)[0]?.count)}
                    </div>
                  </Link>
                ))}
                <div className={s.summ}>Summ: ${props.products.reduce((summ, elem)=>(summ + (elem.price * Number(el.products.filter((i) => i.id === elem.uuid)[0]?.count))), 0)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.setings?.orders,
  userId: state.account?.uuid,
  products: state.adminOrder?.products,
  prodLoad: state.adminOrder?.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(userLoadOrders(userId)),
    getProducts: (arr) => dispatch(getSingleOrderProducts(arr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
