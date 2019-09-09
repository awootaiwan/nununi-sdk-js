import React from "react";

const SuggestionTag = ({ link, text, limit }) => {
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}`;
  const url = `${baseUrl}?tags=${link}&limit=${limit}`;
  return (
    <a href={url}>
      <span>{text}</span>
    </a>
  );
};

export default SuggestionTag;
