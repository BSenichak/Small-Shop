import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./components/Category/Category";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import Product from "./components/Product/Product";
import ForgotPassword from "./components/Account/ForgotPassword/ForgotPassword";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import { loadCart, setPageTheme } from "./store/header/headerActions";
import { checkLogin } from "./store/account/accountActions";
import UserSetings from "./components/Account/UserSetings/UserSetings";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("theme") === null) {
      window.localStorage.setItem("theme", "light");
    } else if (window.localStorage.getItem("theme") === "light") {
      dispatch(setPageTheme("light"));
    } else {
      dispatch(setPageTheme("dark"));
    }
    return () => null;
  });
  useEffect(()=>{
    dispatch(loadCart())
    dispatch(checkLogin())
  })
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/*" element={<NotFound />}></Route>
          <Route path="/category/*" element={<Category/>}></Route>
          <Route path="/product/*" element={<Product/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/login/forgotpassword" element={<ForgotPassword/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/setings/*" element={<UserSetings/>}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
