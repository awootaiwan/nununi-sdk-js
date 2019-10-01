import React from "react";

const ProductTagItem = ({ link, text }) => {
  return (
    <a className='cupid-tag' href={link}>
      <span>{text}</span>
    </a>
  );
};

export default ProductTagItem;
