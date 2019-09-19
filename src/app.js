import React from 'react';
import ReactDOM from 'react-dom';
import { getApiData, getProductTagApiData, getClassifyApiData } from './api/base';
import ErrorAlert from './components/erroralert/ErrorAlert';
import Suggestion from './components/suggestion/suggestion';
import ProductList from './components/product/ProductList';
import ProductTag from './components/productTag/productTag';

const splitTags = tags => (typeof tags === 'string' ? tags.split(',') : tags);



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
      throw new Error('nununi id or access token not setting');
    }
    this.id = id;
    this.token = token;
    this.apiVer = 'latest';
    this.limit = 10;
  }

  setAPIVersion(version) {
    this.apiVer = version;
  }

  setLimit(limit) {
    if (typeof limit != "number") {
      throw Error("setLimit is not number.");
    }

    if(limit < 1) {
      throw Error("limit need to be greater than 0.");
    }
    this.limit = limit;
  }

  _getUrlParms() {
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
      limit = this.limit;
    }
    return {
      tags,
      page,
      limit,
      sort,
    };
  };

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
    const pageInfo = this._getUrlParms();
    
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
    
    const pageInfo = this._getUrlParms();
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

  getProductTags(productId) {
    return getProductTagApiData(this.id, this.token, this.apiVer, productId);
  }

  async renderProductTag(productId) {
    const CupidProductTag = document.getElementById('cupid-product-tag');
    if (!CupidProductTag || CupidProductTag.length < 1) {
      throw new Error('請先加入 <div id="cupid-product-tag"></div> HTML標籤');
    }
    if(productId === undefined){
      const idDom = document.querySelector('div[data-cupid-product-id], a[data-cupid-product-id], span[data-cupid-product-id]');
      if (!idDom) {
        throw new Error('請在div或a或span標籤內增加data-cupid-product-id屬性，並指定商品id')
      }
      productId = idDom.dataset.cupidProductId;
    }

    const data = await this.getProductTags(productId);

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductTag
          ProductTag={result.tags}
        />
      </App>, CupidProductTag,
    );
  }

  getClassify(productIdArray) {
    if(productIdArray.length < 1){
      throw new Error('傳入商品id陣列為空陣列');
    }
    return getClassifyApiData(this.id, this.token, this.apiVer, {productIds:productIdArray});
  }

  async renderClassify(productId) {
    const CupidClassify = document.getElementById('cupid-classify');
    if (!CupidClassify || CupidClassify.length < 1) {
      throw new Error('請先加入 <div id="cupid-classify"></div> HTML標籤');
    }

    if(productId === undefined){
      const idDom = document.querySelectorAll('div[data-cupid-product-id], a[data-cupid-product-id], span[data-cupid-product-id]');
      if (!idDom) {
        throw new Error('請在div或a或span標籤內增加data-cupid-product-id屬性，並指定商品id')
      }
      let productIdArray = [];
      idDom.forEach(item => {
        productIdArray.push(item.dataset.cupidProductId);
      })
      productId = productIdArray;
    }

    const data = await this.getClassify(productId);

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductTag
          ProductTag={result.tags}
        />
      </App>, CupidClassify,
    );
  }
}
/** Detect free variable `global` from Node.js. */
const freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
const freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')();

module.exports = root.CupidSDK = CupidSDK;
