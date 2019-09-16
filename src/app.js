import React from 'react';
import ReactDOM from 'react-dom';
import { getApiData, getProductTagApiData } from './api/base';
import ErrorAlert from './components/erroralert/ErrorAlert';
import Suggestion from './components/suggestion/suggestion';
import ProductList from './components/product/ProductList';
import ProductTag from './components/productTag/productTag';

const splitTags = tags => (typeof tags === 'string' ? tags.split(',') : tags);

const getUrlParms = () => {
  const url = new URL(window.location.href);
  const tags = url.searchParams.get('tags');
  let page = url.searchParams.get('page');
  let sort = url.searchParams.get('sort');
  let limit = url.searchParams.get('limit');

  if (page === null) {
    page = 1;
  }
  if (sort === null || sort === '') {
    sort = 8;
  }
  if (limit === null) {
    limit = 10;
  }
  return {
    tags,
    page,
    limit,
    sort,
  };
};

const App = (props) => (
  <React.Fragment>
    {(props.errcode === 0) ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </React.Fragment>
);

class CupidSDK {
  constructor(id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN) {
    if (!id || !token || id.length < 1 || token.length < 1) {
      throw new Error('nununi id 或者 access token 未填寫');
    }
    this.id = id;
    this.token = token;
    this.apiVer = 'latest';
  }

  setAPIVersion(version) {
    this.apiVer = version;
  }

  getContentAll(tags, page = 1, sort = 8, limit = 10) {
    return getApiData(this.id, this.token, this.apiVer, {
      tags: splitTags(tags), page, sort, limit,
    });
  }

  getContentPageInfo(tags) {
    return getApiData(this.id, this.token, this.apiVer, {
      tags: splitTags(tags),
    }, 'pageInfo');
  }

  getContentSuggestionTags(tags) {
    return getApiData(this.id, this.token, this.apiVer, {
      tags: splitTags(tags),
    }, 'suggestionTags');
  }

  getContentProducts(tags, page = 1, sort = 8, limit = 10) {
    return getApiData(this.id, this.token, this.apiVer, {
      tags: splitTags(tags), page, sort, limit,
    }, 'products');
  }

  async renderSuggestionTag() {
    const CupidSuggestionTag = document.getElementById('cupid-suggestion-tag');
    if (!CupidSuggestionTag || CupidSuggestionTag.length < 1) {
      throw new Error('請先加入 <div id="cupid-suggestion-tag"></div> HTML標籤');
    }
    const pageInfo = getUrlParms();
    
    const data = await this.getContentAll(
      splitTags(pageInfo.tags), pageInfo.page, pageInfo.sort, pageInfo.limit,
    );
    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <Suggestion
          suggestionTags={result.suggestionTags}
          pageInfo={pageInfo}
        />
      </App>, CupidSuggestionTag,
    );
  }

  async renderProductList() {
    const CupidProductList = document.getElementById('cupid-product-list');
    if (!CupidProductList || CupidProductList.length < 1) {
      throw new Error('請先加入 <div id="cupid-product-list"></div> HTML標籤');
    }
    
    const pageInfo = getUrlParms();
    const data = await this.getContentAll(
      splitTags(pageInfo.tags), pageInfo.page, pageInfo.sort, pageInfo.limit,
    );
   
    const { errcode, errmsg, result } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductList productlist={result} pageInfo={pageInfo} />
      </App>,
      CupidProductList,
    );
  }

  getProductTags() {
    const productId = document.getElementById('data-cupid-product-id').dataset.cupidProductId;
    if (!productId || productId.length < 1) {
      throw new Error('請在html標籤上增加data屬性：id="data-cupid-product-id" data-cupid-product-id="{商品id}"');
    }
    return getProductTagApiData(this.id, this.token, this.apiVer, productId);
  }

  async renderProductTag() {
    const CupidProductTag = document.getElementById('cupid-product-tag');
    if (!CupidProductTag || CupidProductTag.length < 1) {
      throw new Error('請先加入 <div id="cupid-product-tag"></div> HTML標籤');
    }

    const data = await this.getProductTags();

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductTag
          ProductTag={result.tags}
        />
      </App>, CupidProductTag,
    );
  }
}

module.exports = window.CupidSDK = CupidSDK;
