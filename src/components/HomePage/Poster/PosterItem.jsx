import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDownloadURL, ref,  } from "firebase/storage";
import { storage } from "../../../plagins/firebase";

export const PosterItem = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    getDownloadURL(
      ref(storage, `posters/${props.data.link}`)
    ).then((url) => setImage(url));
  });
  return (
    <img
      src={image}
      key={props.data.id}
      alt={`poster${props.data.id}`}
    />
  );
};

export default connect()(PosterItem);
