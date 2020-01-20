import React from "react";
import { useTranslation } from 'react-i18next';
import SuggestionTag from "./suggestionTag.js";
import styled from 'styled-components'

const SuggestionDiv = styled.div`
  background-color: #fff6f7;
  border: 1px solid #ada9a8;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 16px 16px;

  ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 13px;
      margin: 5px;
      color: #fff;
      border-radius: 3px;
      white-space: nowrap;

      a {
        background: #f63577;
        line-height: 31px;
        padding: 7px 10px;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
    }
  }
`;

const SuggestionList = styled.div`
  p {
    font-size: 15px;
    text-align: left;
  }

  span {
    border: 1px solid #f63577;
    float: left;
    display: inline;
    list-style: none;
    color: #f63577;
    background-color: #fff;
    margin-left: 10px;
    padding: 3px;
    margin-bottom: 5px;
    border-radius: 20px;
    padding: 0 20px;
  }

  span:hover {
    background-color: #fff0f5;
    transition: .3s;
  }
`;
const Suggestion = ({ suggestionTags, pageInfo }) => {
  const { t } = useTranslation();
  if (pageInfo.tags === null) {
    pageInfo.tags = "";
  }
  const tags = pageInfo.tags.split(",");
  const { limit } = pageInfo;
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}`;

  return (
    <SuggestionDiv>
      <ul>
        {
          pageInfo.tags &&
          pageInfo.tags.length > 0 &&
          tags.map(tag =>(
            <li className="page-tag" key={tag}><a href={`${baseUrl}?tags=${tag}&limit=${limit}`}>{tag}</a></li>
          ))
        }
      </ul>
      <SuggestionList>
        <p>{t('youWillWantTo')}:</p>{" "}
        {suggestionTags &&
          suggestionTags.length > 0 &&
          suggestionTags.map((list, index) => {
            return (
              <SuggestionTag limit={limit} link={list.link} text={list.text} key={index} />
            );
          })}
      </SuggestionList>
    </SuggestionDiv>
  );
};

export default Suggestion;
