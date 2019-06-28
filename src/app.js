import React from "react";
import ReactDOM from "react-dom";
import { getApiData } from './api/base';
import ErrorAlert from './components/erroralert/ErrorAlert';
import Suggestion from './components/suggestion/suggestion';
import ProductList from './components/product/ProductList';

const getContent = async (id, token) => {
  let urlParms = getUrlParms();
  let data = {
    errcode: 0,
    errmsg: "",
    result: {}
  }

  data = (urlParms.tags) ? await getApiData(id, token, urlParms) : data ;

  return data;
}

const getUrlParms = () => {
  let url = new URL(window.location.href);
  let tags = url.searchParams.get("tags");
  let page = url.searchParams.get("page");
  let sort = url.searchParams.get("sort");
  let limit = url.searchParams.get("limit");

  if (page === null) {
    page = 1;
  }
  if (sort === null || sort === "") {
    sort = 8;
  }
  if (limit === null) {
    limit = 10 ;
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
    if (!ID || !TOKEN) {
      throw new Error("nununi id 或者 access token 未填寫");
    } 
  },
  renderSuggestionTag: async () => {
    if (!ID || !TOKEN) {
      throw new Error('請先呼叫函數 window.CupidSDK.init');
    }
    const CupidSuggestionTag = document.getElementById("cupid-suggestion-tag");
    if (!CupidSuggestionTag || CupidSuggestionTag.length < 1) {
      throw new Error('請先加入 <div id="cupid-suggestion-tag"></div> HTML標籤');
    } 
    
    let data = await getContent(ID, TOKEN);
    const pageInfo = getUrlParms();
    const { result, errcode, errmsg } = data;

    ReactDOM.render(<App errcode={errcode} errmsg={errmsg}><Suggestion suggestionTags={result.suggestionTags} pageInfo={pageInfo} /></App>, CupidSuggestionTag);    
  },
  renderProductList: async () => {
    if (!ID || !TOKEN) {
      throw new Error('請先呼叫函數 window.CupidSDK.init');
    }
    const CupidProductList = document.getElementById("cupid-product-list");
    if (!CupidProductList || CupidProductList.length < 1) {
      throw new Error('請先加入 <div id="cupid-product-list"></div> HTML標籤');
    } 
    
    let data = await getContent(ID, TOKEN);
    const pageInfo = getUrlParms();
    const { errcode, errmsg } = data;
    
    ReactDOM.render(<App errcode={errcode} errmsg={errmsg}><ProductList productlist={data.result} pageInfo={pageInfo} /></App>, CupidProductList);    
  }
}

module.exports = window.CupidSDK = CupidSDK;