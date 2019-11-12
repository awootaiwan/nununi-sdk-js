import React from "react";

const ProductTagItem = ({ link, text }) => {
  return (
    <a className='nununi-tag' href={link}>
      <span>{text}</span>
    </a>
  );
};

export default ProductTagItem;
