import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import RelatedProductItem from "./RelatedProductItem.js";
import styled from 'styled-components';
import Carousel, { consts } from 'react-elastic-carousel';

const RelatedProductWrapper = styled.div`
&.nununi-related {
  &-wrapper {
    p {
      font-size: 15px;
      text-align: left;
    }
    .rec-slider-container {
      margin: 0 20px;
    }
    .rec-pagination {
      display:none;
    }
  }
}
.nununi-related {
  &-product {
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
      max-height: 48px;
      min-height: 32px
      line-height: 16px;
      letter-spacing: .05em;
    }
  }
  &-carousel {
    position: relative;
  }
}

.nununi-carousel-arrow {
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
    display: none;
    left: 0;
  }
  &.NEXT {
    right: 0;
  }
}
`

const RelatedProduct = ({ RelatedProduct }) => {
  const { t } = useTranslation();
  const arrowNEXT = useRef(null);
  const arrowPREV = useRef(null);
  const carouselRef = useRef(null)
  const [childNum, setChildNum] = useState(0);
  const [showItem, setShowItem] = useState(0);
  const [scrollItem, setScrollItem] = useState(0);
  const breakPoints = [
    { width: 350, itemsToShow: 2, itemsToScroll: 2 },
    { width: 400, itemsToShow: 3, itemsToScroll: 3 },
    { width: 500, itemsToShow: 5, itemsToScroll: 5 }
  ];
  let tagList = [];
  let productList = [];

  useEffect(() => {
    setChildNum(carouselRef.current.props.children.length);
  }, [carouselRef])

  if (RelatedProduct.length > 0) {
    RelatedProduct.forEach((tag, index) => {
      tagList.push(tag.tag);
      tag.products.forEach((item, index) => {
        productList.push(item)
      })
    })
  }

  function slideArrow({ type, onClick }) {
    const pointer = type === consts.PREV ? '<' : '>';
    return <div 
              className={`nununi-carousel-arrow ${type}`} 
              onClick={onClick}
              ref={type === "NEXT" ? arrowNEXT : arrowPREV}>
                {pointer}
            </div>
  };

  return (
    <RelatedProductWrapper className="nununi-related-wrapper">
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
            className={'nununi-related-carousel'}
            renderArrow={slideArrow}
            ref={carouselRef}
            onResize={(currentBreakPoint) => {
              carouselRef.current.goTo(0);
              arrowPREV.current.style.display = 'none';
              arrowNEXT.current.style.display = 'block';
              const idealHeight = document.querySelector('.nununi-related-product').clientHeight;
              const adjustDom = document.querySelector('.nununi-related-wrapper .rec-carousel');
              adjustDom.style.height = idealHeight + 'px';
              setScrollItem(currentBreakPoint.itemsToScroll);
              setShowItem(currentBreakPoint.itemsToShow);
              if (parseInt(showItem) > parseInt(childNum)) {
                arrowNEXT.current.style.display = 'none';
                arrowPREV.current.style.display = 'none';
              }
            }}
            onPrevStart={(nextItem) =>
              {
                arrowNEXT.current.style.display = 'block';
                if (nextItem.index == 0) {
                  arrowPREV.current.style.display = 'none';
                }
              }
            }
            onNextStart={(nextItem) =>
              {
                arrowPREV.current.style.display = 'block';
                if (nextItem.index == (childNum -1) || nextItem.index + scrollItem >= (childNum)) {
                  arrowNEXT.current.style.display = 'none';
                }
              }
            }
          >
            {productList.map((product, index) => {
              return (
                <RelatedProductItem 
                  url={product.url} 
                  imageUrl={product.productImageUrl} 
                  productName={product.productName} 
                  key={index}
                />
              );
            })}
          </Carousel>
        </>
      }
    </ RelatedProductWrapper >
  );
};

export default RelatedProduct;