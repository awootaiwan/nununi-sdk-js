import React from 'react';
import "./suggestion.css";
import SuggestionTag from "./suggestionTag.js";

const Suggestion = ({ suggestionTags }) => {
	return (
		<div className="suggestion">
			<ul><li><a>洗面乳</a></li></ul>
			<div className="suggestion-list"><p>您可能還會想找：</p> {
				suggestionTags.map((list, index) => {
					return (
						<SuggestionTag link={list.link} text={list.text} key={index} />
					)
				})
			}
			</div>
		</div>
	)
}

export default Suggestion