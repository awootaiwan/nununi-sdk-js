import React from "react";
import { useTranslation } from 'react-i18next';
import RelatedProductItem from "./relatedProductItem.js";
import styled from 'styled-components';
import Carousel, { consts } from 'react-elastic-carousel';

const RelatedProductWrapper = styled.div`
.nununi-related-product {
  position: relative;
  width: 100%;
  a {
    width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    display: block;
    :hover {
      cursor: pointer;
    }
  }
  &-img {
    display: block;
    border-radius: 2px;
    :hover {
      cursor: pointer;
    }
    div {
      padding-bottom: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
      background-size: 100%;
    }
  }
  &-name {
    margin-top: 12px;
    overflow: hidden;
    height: 32px;
    line-height: 16px;
    letter-spacing: .05em;
    text-overflow: ellipsis;
  }
}

p {
  font-size: 15px;
  text-align: left;
}
.nununi-related-carousel {
  position: relative;
  &-paginition {
    padding: 20px 0;
    div { 
      display: inline-block;
      width: 25px;
      height: 8px;
      margin: 0 5px;
      background-color: #ccc;
      border-radius: 3px;
      :hover {
        cursor: pointer;
      }
    }
    div[active=true] {
      background-color: #aaa;
    }
  }
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  padding: 0;
  line-height: 20px;
  border-radius: 3px;
  border: 1px solid #eee;
  background-color: #ccc;
  color: #fff;
  text-align: center;
  font-size: 1.2em;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
  &.PREV {
    left: 0;
  }
  &.NEXT {
    right: 0;
  }
}
.rec-slider-container {
  margin: 0 20px;
}
`;
function slideArrow({ type, onClick }) {
  const pointer = type === consts.PREV ? '<' : '>';
  return <div className={`carousel-arrow ${type}`} onClick={onClick}>{pointer}</div>
};
const RelatedProduct = ({ RelatedProduct }) => {
  const { t } = useTranslation();
  let tagList = [];
  let productList = [];
  const breakPoints = [
    { width: 350, itemsToShow: 2 },
    { width: 400, itemsToShow: 3 },
    { width: 500, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
  ];
  if (RelatedProduct.length > 0) {
    RelatedProduct.forEach((tag, index) => {
      tagList.push(tag.tag);
      tag.products.forEach((item, index) => {
        productList.push(item)
      })
    })
  }
  return (
    <RelatedProductWrapper className="nununi-related-wrapper" >
      { productList && 
        productList.length > 0 &&
        <>
        <p>{t('youMay')}:
        {
          tagList.map((item, index) => {
            return (
              <span className="nununi-related-span" key={index}>{item}</span>
            )
          })
        }{t('interested')}
      </p>
      <Carousel 
        breakPoints={breakPoints} 
        itemsToScroll={2}
        className={'nununi-related-carousel'}
        renderArrow={slideArrow}
        onResize={currentBreakPoint => {
          const idealHeight = document.querySelector('.nununi-related-product').clientHeight;
          const adjustDom = document.querySelector('.rec-carousel');
          adjustDom.style.height = idealHeight + 'px';
          }
        }
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div className={'nununi-related-carousel-paginition'}>
              {pages.map(page => {
                const isActivePage = activePage === page
                return (
                  <div
                    key={page}
                    onClick={() => onClick(page)}
                    active={isActivePage.toString()}
                  />
                )
              })}
            </div>
          )
        }}
      >
        {productList.map((product, index) => {
          return (
            <RelatedProductItem 
              url={product.url} 
              imageUrl={product.productImageUrl} 
              productName={product.productName} 
              key={index} />
          );
        })}
      </Carousel>
      </>
      } 
    </ RelatedProductWrapper >
  );
};

export default RelatedProduct;