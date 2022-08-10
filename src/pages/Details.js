import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  console.log(id);
  return <div>Details</div>;
};

export default Details;
