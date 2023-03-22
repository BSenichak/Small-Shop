import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDownloadURL, ref,  } from "firebase/storage";
import { storage } from "../../../plagins/firebase";

export const PosterItem = (props) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDownloadURL(
      ref(storage, `posters/${props.data.link}`)
    ).then((url) => setImage(url));
  });
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <img style={loading?{display: "none"}:{}}
        src={image}
        alt={`poster${props.data.id}`}
        onLoad={()=>setLoading(false)}
      />
    </div>
      
  );
};

export default connect()(PosterItem);
