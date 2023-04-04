import React from "react";
import { connect } from "react-redux";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import s from "./AdminPage.module.css";
import {
  AiOutlineFileAdd,
  AiOutlineFileSync,
  AiOutlineFileText,
  AiOutlineFolderOpen,
  AiOutlineFund,
} from "react-icons/ai";
import AdminAddProduct from "./AdminAddProduct/AdminAddProduct";
import AdminPosterManage from "./AdminPosterManage/AdminPosterManage";
import AdminCategoriesManage from "./AdminCategoriesManage/AdminCategoriesManage"
import AdminProductsManage from "./AdminProductsManage/AdminProductsManage";
import AdminOrders from "./AdminOrders/AdminOrders";

export const AdminPage = (props) => {
  const currentLink = useLocation().pathname.substring(7);
  return (
    <div className={s.Wrapper}>
      <aside className={s.aside}>
        <Link
          to={"postermanage"}
          className={`${s.link} ${
            currentLink === "postermanage" ? s.actLink : ""
          }`}
        >
          <AiOutlineFund />
          Poster manage
        </Link>
        <Link
          to={"categorymanage"}
          className={`${s.link} ${
            currentLink === "categorymanage" ? s.actLink : ""
          }`}
        >
          <AiOutlineFolderOpen />
          Category manage
        </Link>
        <Link
          to={"addproduct"}
          className={`${s.link} ${
            currentLink === "addproduct" ? s.actLink : ""
          }`}
        >
          <AiOutlineFileAdd />
          Add product
        </Link>
        <Link
          to={"manageproduct"}
          className={`${s.link} ${
            currentLink === "manageproduct" ? s.actLink : ""
          }`}
        >
          <AiOutlineFileSync />
          Manage product
        </Link>
        <Link
          to={"orders"}
          className={`${s.link} ${
            currentLink.substring(0, 6) === "orders" ? s.actLink : ""
          }`}
        >
          <AiOutlineFileText />
          Order list
        </Link>
      </aside>
      <div className={s.content}>
        <Routes>
          <Route path="postermanage" element={<AdminPosterManage/>} />
          <Route path="categorymanage" element={<AdminCategoriesManage/>} />
          <Route path="addproduct" element={<AdminAddProduct />} />
          <Route path="manageproduct" element={<AdminProductsManage/>} />
          <Route path="/orders/*" element={<AdminOrders/>} />
        </Routes>
      </div>
    </div>
  );
};

export default connect()(AdminPage);
