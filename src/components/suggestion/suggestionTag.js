import React from "react";

const SuggestionTag = ({ link, text }) => {
  const baseUrl = `${location.protocol}//${location.host}?tags=${link}`;
  return (
    <a href={baseUrl}>
      <span>{text}</span>
    </a>
  );
};

export default SuggestionTag;
