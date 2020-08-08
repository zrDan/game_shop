import React from "react";
import CategoryFilter from "../components/CategoryFilter";

function GamesByCategory({
  match: {
    params: { consoleName },
  },
}) {
  return (
    <>
      <CategoryFilter consoleName={consoleName} />
    </>
  );
}

export default GamesByCategory;
