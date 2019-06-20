import React from "react";
import ReactDOM from "react-dom";
import getDataApi from './api/base';
import { async } from "q";
import { exists } from "fs";
import ErrorAlert from './components/erroralert/ErrorAlert';
import Suggestion from './components/suggestion/suggestion';
import ProductList from './components/ProductList';

const getContent = async (id, token) => {
  let urlParms = getUrlParms();
  let data = await getDataApi(id, token, urlParms);

  return data;
}

const getUrlParms = () => {
  let url = new URL(window.location.href);
  let tags = url.searchParams.get("tags");
  let page = url.searchParams.get("page");
  let sort = url.searchParams.get("sort");
  let limit = 10;

  if (page === null) {
    page = 1;
  }
  if (sort === null) {
    sort = 1;
  }
  let data = {
    tags,
    page,
    limit,
    sort
  }
  return data;
}

const App = (props) => (
  <React.Fragment>
    {(props.errcode === 0) ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </React.Fragment>
)

let ID = '';
let TOKEN = '';
const CupidSDK = {
  init: ({ id, token }) => {
    ID = id;
    TOKEN = token;
  },
  renderSuggestionTag: async () => {
    let data = await getContent(ID, TOKEN);
    const { suggestionTags } = data;
    const Suggestion = document.getElementById("cupid-suggestion-tag");
    ReactDOM.render(<App {...data}><Suggestion suggestionTags={suggestionTags} /></App>, Suggestion);
  },
  renderProductList: async () => {
    let data = await getContent(ID, TOKEN);
    const { products } = data;
    const pageInfo = getUrlParms();
    const ProductList = document.getElementById("cupid-product-list");
    ReactDOM.render(<App data={...data}><ProductList products={products} {...pageInfo} /></App>, ProductList);
  }
}

module.exports = window.CupidSDK = CupidSDK;