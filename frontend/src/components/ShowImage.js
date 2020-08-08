import React from "react";
import { API } from "../config";

function ShowImage({ item, url }) {
  return <img src={`${API}/${url}/cover/${item}`} alt="cover" />;
}

export default ShowImage;
