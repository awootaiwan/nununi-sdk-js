import React from "react";

const RelatedProductItem = ({ url, imageUrl, productName }) => {
  return (
    <li className='nununi-related-product' >
      <a href={url}>
        <img className='nununi-related-product-img' src={imageUrl}></img>
      </a>
      <a href={url}>
        <span className='nununi-related-product-name'>{productName}</span>
      </a>
    </li>
  );
};

export default RelatedProductItem;
