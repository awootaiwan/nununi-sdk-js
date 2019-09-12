import React from "react";

const ProductTagItem = ({ link, text }) => {
  const baseUrl = `${location.protocol}//${location.host}?tags=${link}`;
  return (
    <a class="tag" href={baseUrl}>
      <span>{text}</span>
    </a>
  );
};

export default ProductTagItem;
