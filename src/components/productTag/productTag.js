import React from "react";
import ProductTagItem from "./ProductTagItem.js";
import styled from 'styled-components'

const ProductTagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    text-decoration: none;
    background: #ccc;
    border: 1px solid #eee;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    margin-right: 8px;
    padding: 5px 10px;

    :hover {
      cursor: pointer;
      border: 1px solid #333;
      background: #fff;
      color: #333;
    }
  }
`;

const ProductTag = ({ ProductTag }) => {
  return (
    <ProductTagDiv>
      {ProductTag &&
        ProductTag.length > 0 &&
        ProductTag.map((tag, index) => {
          return (
            <ProductTagItem link={tag.fullLink} text={tag.text} key={index} />
          );
        })}
    </ProductTagDiv>
  );
};

export default ProductTag;