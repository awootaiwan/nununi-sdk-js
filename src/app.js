import React from 'react';
import ReactDOM from 'react-dom';
import i18nLocale from './locale';
import {
  getApiData,
  getProductTagApiData,
  getRelatedProductsApiData,
  getClassifyApiData,
  getClassifyProductTypeApiData,
} from './api/base';
import Suggestion from './components/suggestion/Suggestion';
import ProductList from './components/product/ProductList';
import ProductTag from './components/productTag/ProductTag';
import RelatedProduct from './components/relatedProduct/RelatedProduct';
import { Helmet } from 'react-helmet';

const splitTags = (tags) => (typeof tags === 'string' ? tags.split(',') : tags);

const App = (props) => (
  <React.Fragment>{props.errcode === 0 && props.children}</React.Fragment>
);

class NununiSDK {
  constructor(id = process.env.NUNUNI_ID, lang = 'ja') {
    if (!id || id.length < 1) {
      throw new Error('nununi id is not setting');
    }
    this.id = id;
    this.contentApiVer = 'latest';
    this.productsApiVer = 'latest';
    this.limit = 10;
    this.lang = lang;
    i18nLocale.init(this.lang);
  }

  setContentAPIVersion(apiVer) {
    this.contentApiVer = apiVer;
  }

  setProductsAPIVersion(apiVer) {
    this.productsApiVer = apiVer;
  }

  setLanguage(lang) {
    this.lang = lang;
    i18nLocale.changeLanguage(this.lang);
  }

  setLimit(limit) {
    if (typeof limit != 'number') {
      throw Error('setLimit is not number.');
    }

    if (limit < 1) {
      throw Error('limit need to be greater than 0.');
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
      sort = 12;
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
  }

  getContentAll(tags, page = 1, sort = 8, limit = 10) {
    return getApiData(this.id, this.contentApiVer, {
      tags: splitTags(tags),
      page,
      sort,
      limit,
    });
  }

  getContentPageInfo(tags) {
    return getApiData(
      this.id,
      this.contentApiVer,
      {
        tags: splitTags(tags),
      },
      'pageInfo',
    );
  }

  getContentSuggestionTags(tags) {
    return getApiData(
      this.id,
      this.contentApiVer,
      {
        tags: splitTags(tags),
      },
      'suggestionTags',
    );
  }

  getContentProducts(tags, page = 1, sort = 8, limit = 10) {
    return getApiData(
      this.id,
      this.contentApiVer,
      {
        tags: splitTags(tags),
        page,
        sort,
        limit,
      },
      'products',
    );
  }

  async renderSuggestionTag() {
    const NununiSuggestionTag = document.getElementById(
      'nununi-suggestion-tag',
    );
    if (!NununiSuggestionTag || NununiSuggestionTag.length < 1) {
      throw new Error(
        'Please add `<div id="nununi-suggestion-tag"></div>` HTML Tags',
      );
    }
    const pageInfo = this._getUrlParms();
    if (!pageInfo.tags) {
      throw new Error('renderSuggestionTag: Please add tags is required');
    }
    const data = await this.getContentAll(
      splitTags(pageInfo.tags),
      pageInfo.page,
      pageInfo.sort,
      pageInfo.limit,
    );
    const { result, errcode, errmsg } = data;
    let { title, description, canonical } = result.pageInfo;
    const meta = {
      title: title == '' ? null : title,
      description: description == '' ? null : description,
      canonical: canonical == '' ? null : canonical,
    };
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const descriptionEl = document.querySelector('meta[name="description"]');
    setTimeout(() => {
      if (canonicalEl !== null) {
        canonicalEl.href = meta.canonical;
      }
      if (descriptionEl !== null) {
        descriptionEl.content = meta.description;
      }
    }, 0);

    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <Helmet>
          <title>{meta.title}</title>
          {!canonicalEl && <link rel='canonical' href={meta.canonical} />}
          {!descriptionEl && (
            <meta name='description' content={meta.description} />
          )}
        </Helmet>
        <Suggestion
          suggestionTags={result.suggestionTags}
          pageInfo={pageInfo}
        />
      </App>,
      NununiSuggestionTag,
    );
  }

  async renderProductList() {
    const NununiProductList = document.getElementById('nununi-product-list');
    if (!NununiProductList || NununiProductList.length < 1) {
      throw new Error(
        'Please add <div id="nununi-product-list"></div> HTML tag',
      );
    }

    const pageInfo = this._getUrlParms();
    if (!pageInfo.tags) {
      throw new Error('renderProductList: Please add tags is required');
    }
    const data = await this.getContentAll(
      splitTags(pageInfo.tags),
      pageInfo.page,
      pageInfo.sort,
      pageInfo.limit,
    );

    const { errcode, errmsg, result } = data;
    let { title, description, canonical } = result.pageInfo;

    const meta = {
      title: title == '' ? null : title,
      description: description == '' ? null : description,
      canonical: canonical == '' ? null : canonical,
    };
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const descriptionEl = document.querySelector('meta[name="description"]');
    setTimeout(() => {
      if (canonicalEl !== null) {
        canonicalEl.href = meta.canonical;
      }
      if (descriptionEl !== null) {
        descriptionEl.content = meta.description;
      }
    }, 0);

    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <Helmet>
          <title>{meta.title}</title>
          {!descriptionEl && (
            <meta name='description' content={meta.description} />
          )}
          {!canonicalEl && <link rel='canonical' href={meta.canonical} />}
        </Helmet>
        <ProductList productlist={result} pageInfo={pageInfo} />
      </App>,
      NununiProductList,
    );
  }

  getProductTags(productId) {
    return getProductTagApiData(this.id, this.productsApiVer, productId);
  }
  getRelatedProducts(productId) {
    return getRelatedProductsApiData(this.id, this.productsApiVer, productId);
  }

  async renderProductTag(productId) {
    const NununiProductTag = document.getElementById('nununi-product-tag');
    const NununiRelatedProduct = document.getElementById(
      'nununi-product-tag-image',
    );
    if (productId === undefined) {
      const idDom = document.querySelector(
        'div[data-nununi-product-id], a[data-nununi-product-id], span[data-nununi-product-id]',
      );
      if (!idDom) {
        throw new Error(
          'please div / a / span tags add a data-nununi-product-id',
        );
      } else if (idDom.dataset.nununiProductId === '') {
        throw new Error('data-nununi-product-id is null');
      }
      productId = idDom.dataset.nununiProductId;
    }
    if (NununiProductTag) {
      const data = await this.getProductTags(productId);

      const { result, errcode, errmsg } = data;
      ReactDOM.render(
        <App errcode={errcode} errmsg={errmsg}>
          <ProductTag ProductTag={result.tags} />
        </App>,
        NununiProductTag,
      );
    }
    if (NununiRelatedProduct) {
      const data = await this.getRelatedProducts(productId);

      const { result, errcode, errmsg } = data;
      ReactDOM.render(
        <App errcode={errcode} errmsg={errmsg}>
          <RelatedProduct RelatedProduct={result.relatedProducts} />
        </App>,
        NununiRelatedProduct,
      );
    }
  }

  getClassify(productIdArray) {
    if (productIdArray.length < 1) {
      throw new Error('Input product ids array is empty');
    }
    return getClassifyApiData(this.id, this.productsApiVer, {
      productIds: productIdArray,
    });
  }

  getClassifyProductType(productType) {
    if (productType.length < 1) {
      throw new Error('Need to pass product type name');
    }
    return getClassifyProductTypeApiData(this.id, this.productsApiVer, {
      productType,
    });
  }

  async renderClassify(productId) {
    const NununiClassify = document.getElementById('nununi-classify');
    if (!NununiClassify || NununiClassify.length < 1) {
      throw new Error('Please add <div id="nununi-classify"></div> HTML tag');
    }

    if (productId === undefined) {
      const idDom = [
        ...document.querySelectorAll(
          'div[data-nununi-product-id], a[data-nununi-product-id], span[data-nununi-product-id]',
        ),
      ];
      if (!idDom) {
        throw new Error('please div / a /span tag add data-nununi-product-id');
      }
      let productIdArray = idDom.map((item) => {
        return item.dataset.nununiProductId;
      });
      productId = productIdArray;
    }

    const data = await this.getClassify(productId);

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        <ProductTag ProductTag={result.tags} />
      </App>,
      NununiClassify,
    );
  }

  async renderClassifyProductType(productType) {
    const CupidClassify = document.getElementById('nununi-classify');
    if (!CupidClassify || CupidClassify.length < 1) {
      throw new Error(
        'Please add `<div id="nununi-classify"></div>` in HTML Tag',
      );
    }

    if (productType === undefined) {
      throw new Error(
        'Please give `productType` string attribute to call `renderClassifyProductType`',
      );
    }

    const data = await this.getClassifyProductType(productType);

    const { result, errcode, errmsg } = data;
    ReactDOM.render(
      <App errcode={errcode} errmsg={errmsg}>
        {result.tags.length > 0 && <ProductTag ProductTag={result.tags} />}
      </App>,
      CupidClassify,
    );
  }
}
/** Detect free variable `global` from Node.js. */
const freeGlobal =
  typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
const freeSelf =
  typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')();

module.exports = root.NununiSDK = NununiSDK;
