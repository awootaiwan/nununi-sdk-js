import React from "react";
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
        cursor: default;
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
    margin-bottom: 5px
  }

  span:hover {
    background-color: #fff0f5;
    transition: .3s;
  }
`;
const Suggestion = ({ suggestionTags, pageInfo }) => {
  if (pageInfo.tags === null) {
    pageInfo.tags = "";
  }
  const tags = pageInfo.tags.split(",");
  
  return (
    <SuggestionDiv>
      <ul>
        {
          pageInfo.tags &&
          pageInfo.tags.length > 0 &&
          tags.map(tag =>(          
            <li key={tag}><a>{tag}</a></li>
          ))
        }
      </ul>
      <SuggestionList>
        <p>您可能還會想找:</p>{" "}
        {suggestionTags &&
          suggestionTags.length > 0 &&
          suggestionTags.map((list, index) => {
            return (
              <SuggestionTag link={list.link} text={list.text} key={index} />
            );
          })}
      </SuggestionList>
    </SuggestionDiv>
  );
};

export default Suggestion;
