import React from "react";
import ProductTagItem from "./productTagItem.js";
import styled from 'styled-components'

const ProductTagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    text-decoration: none;
    background: #f47f9d;
    border: 1px solid #ee5d84;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    margin-right: 8px;
    padding: 5px 10px;

    :hover {
      cursor: pointer;
    }
  }
`;

const ProductTag = ({ ProductTag }) => {
  console.log({ProductTag});
  return (
    <ProductTagDiv>
      {ProductTag &&
        ProductTag.length > 0 &&
        ProductTag.map((tag, index) => {
          return (
            <ProductTagItem link={tag.full_link} text={tag.text} key={index} />
          );
        })}
    </ProductTagDiv>
  );
};

export default ProductTag;
