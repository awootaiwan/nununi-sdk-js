import React from "react";
import "./suggestion.scss";
import SuggestionTag from "./suggestionTag.js";

const Suggestion = ({ suggestionTags, pageInfo }) => {
  if (pageInfo.tags === null) {
    pageInfo.tags = "";
  }
  const tags = pageInfo.tags.split(",");
  
  return (
    <div className="suggestion">
      <ul>
        {
          pageInfo.tags &&
          pageInfo.tags.length > 0 &&
          tags.map(tag =>(          
            <li key={tag}><a>{tag}</a></li>
          ))
        }
      </ul>
      <div className="suggestion-list">
        <p>您可能還會想找:</p>{" "}
        {suggestionTags &&
          suggestionTags.length > 0 &&
          suggestionTags.map((list, index) => {
            return (
              <SuggestionTag link={list.link} text={list.text} key={index} />
            );
          })}
      </div>
    </div>
  );
};

export default Suggestion;
