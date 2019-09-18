import React from "react";

const ProductTagItem = ({ tagName, link, text }) => {
  return (
    <a class='cupid-tag' href={link}>
      <span>{text}</span>
    </a>
  );
};

export default ProductTagItem;
