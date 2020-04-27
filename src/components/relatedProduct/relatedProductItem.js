import React from "react";

const RelatedProductItem = ({ url, imageUrl, productName }) => {
  const backgroundProductImg = {
    backgroundImage: `url('${imageUrl}')`
  }
  return (
    <div className='nununi-related-product'>
      <a href={url} className='nununi-related-product-img'>
        <div style={backgroundProductImg}></div>
      </a>
      <div className='nununi-related-product-name'>
        <a href={url}>
          {productName}
        </a>
      </div>
    </div>
  );
};

export default RelatedProductItem;
