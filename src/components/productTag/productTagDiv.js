import React from "react";
import ProductTag from "./productTag.js";
import styled from 'styled-components'

const SuggestionDiv = styled.div`
display: flex;
flex-wrap: wrap;
`;

const ProductTagDiv = ({ ProductTag}) => {
  
  return (
    <ProductTagDiv>
      <ProductTag>
        {ProductTagDiv &&
          ProductTagDiv.length > 0 &&
          ProductTagDiv.map((list, index) => {
            return (
              <ProductTagDiv link={list.link} text={list.text} key={index} />
            );
          })}
      </ProductTag>
    </ProductTagDiv>
  );
};

export default ProductTagDiv;
