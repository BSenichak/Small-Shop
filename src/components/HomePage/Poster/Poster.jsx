import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadPosters } from "../../../store/home/poster/posterActions";
import s from "./Poster.module.css";
import PosterItem from "./PosterItem";

export const Poster = (props) => {
  const dispatch = useDispatch();
  const posters = useSelector((state) => state.poster.posters).sort(
    (a, b) => a.id - b.id
  );
  const loading = useSelector((state) => state.poster.loading);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    dispatch(loadPosters());
  }, [dispatch]);
  useEffect(() => {
    const carusel = setInterval(() => {
      if (number > posters.length - 2) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }, 5000);
    return () => clearInterval(carusel);
  }, [number, posters]);
  return (
    <div
      className={s.wrapper}
      style={{ backgroundColor: !loading ? posters[number]?.bgc : "white" }}
    >
      {!loading && (
        <div className={s.bg}>
          <div className={s.posterSlider} style={{ left: `-${number}00%`, width: `${posters.length}00%`}}>
            {posters.map((el) => (
              <PosterItem data={el} key={el.id}/>
            ))}
          </div>
        </div>
      )}
      {!loading && (
        <div className={s.btns}>
          {posters.map((el) => (
            <div
              className={`${s.dot} ${el.id === number ? s.active : ""}`}
              key={el.id}
              onClick={() => setNumber(el.id)}
            ></div>
          ))}
        </div>
      )}
      {loading && (
        <div className={s.spinnerWrapper}>
          <div className={s.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default connect()(Poster);
