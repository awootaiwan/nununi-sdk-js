import React from 'react';

const SuggestionTag = ({ link, text }) => {
	return (<a href={link}>
		<span>
			{text}
		</span>
	</a>)
}

export default SuggestionTag;