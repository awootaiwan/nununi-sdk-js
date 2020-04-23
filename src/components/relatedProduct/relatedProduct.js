import React from "react";
import { useTranslation } from 'react-i18next';
import RelatedProductItem from "./relatedProductItem.js";
import styled from 'styled-components'

const RelatedProductWrapper = styled.div`
ul {
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  width: 20%;
  list-style: none;
  position: relative;
  vertical-align: top;
  a {
    width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    display: block;
    :first-child {
      padding-bottom: 100%;
      border-radius: 2px;
    }
    :hover {
      cursor: pointer;
    }
    img {
      height: auto;
      width: 100%;
      max-height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
p {
  font-size: 15px;
  text-align: left;
}
`;

const RelatedProduct = ({ RelatedProduct }) => {
  const { t } = useTranslation();
  let tagList = [];
  let productList = [];
  if (RelatedProduct && RelatedProduct.length > 0) {
    RelatedProduct.forEach((tag, index) => {
      tagList.push(tag.tag);
      tag.products.forEach((item, index) => {
        productList.push(item)
      })
    })
    return (
      <RelatedProductWrapper className="nununi-related-wrapper">
        <p>{t('youMay')}:
          {
            tagList.map((item, index) => {
              return (
                <span className="nununi-related-span" key={index}>{item}</span>
              )
            })
          }{t('interested')}
        </p>
        <ul>
          {productList.map((product, index) => {
            return (
              <RelatedProductItem 
                url={product.url} 
                imageUrl={product.productImageUrl} 
                productName={product.productName} 
                key={index} />
              );
            })}
            </ul>
        </ RelatedProductWrapper >
    );
  }
};

export default RelatedProduct;