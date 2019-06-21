import React from "react";
import ReactDOM from "react-dom";
import { getApiData } from './api/base';
import ErrorAlert from './components/erroralert/ErrorAlert';
import Suggestion from './components/suggestion/suggestion';
import ProductList from './components/product/ProductList';

const getContent = async (id, token) => {
  let urlParms = getUrlParms();
  let data = await getApiData(id, token, urlParms);

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
  if (sort === null || sort === "") {
    sort = 8;
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
  init: ({ id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN }) => {
    ID = id;
    TOKEN = token;
    if (ID == '' || TOKEN == '') {
      throw new Error("nununi id 或者 access token 未填寫");
    } 
  },
  renderSuggestionTag: async () => {
    let data = await getContent(ID, TOKEN);
    const { result, errcode, errmsg } = data;
    const CupidSuggestionTag = document.getElementById("cupid-suggestion-tag");
    ReactDOM.render(<App errcode={errcode} errmsg={errmsg}><Suggestion suggestionTags={result.suggestionTags} /></App>, CupidSuggestionTag);    
  },
  renderProductList: async () => {
    let data = await getContent(ID, TOKEN);
    const pageInfo = getUrlParms();
    const { errcode, errmsg } = data;
    const CupidProductList = document.getElementById("cupid-product-list");
    ReactDOM.render(<App errcode={errcode} errmsg={errmsg}><ProductList productlist={data.result} pageInfo={pageInfo} /></App>, CupidProductList);    
  }
}

module.exports = window.CupidSDK = CupidSDK;