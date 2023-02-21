import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import { setPageTheme } from "./store/header/headerActions";

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
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/*" element={<NotFound />}></Route>

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
