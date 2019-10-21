import React from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.i`
  position: absolute;
  top: 35%;
  right: 10%;
  z-index: 2;
  display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
  animation: ${rotate} 1s linear infinite;
`;

const SearchBarContainer = styled.div`
  display: inline-block;
  position: relative;
`;

// Autosuggest 樣式
const theme = {
  container: {
    position: 'relative',
  },
  input: {
    width: '240px',
    height: '30px',
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    border: '1px solid #aaa',
    borderRadius: '4px',
  },
  inputFocused: {
    outline: 'none',
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: '51px',
    width: '280px',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 2,
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

// 假資料
const options = [
  {
    name: '長褲',
  },
  {
    name: '短褲',
  },
  {
    name: '褲子',
  },
  {
    name: '洋裝',
  },
  {
    name: '裙子',
  },
  {
    name: '牛仔褲',
  },
  {
    name: '長裙',
  },
  {
    name: '短裙',
  },
];

const INPUT_PLACEHOLD = '請輸入搜尋關鍵字';
// how long the API debounced
const API_DEBOUNCED = 1000;

// 模擬API 撈取 suggestions
function getMatchingOptions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return options.filter((option) => regex.test(option.name));
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class SearchBar extends React.Component {
  state = {
    value: '',
    suggestions: [],
    isLoading: false,
  };

  // Return a new debounced function
  debouncedLoadSuggestions = debounce(this.loadSuggestions, API_DEBOUNCED);

  loadSuggestions(value) {
    this.setState({
      isLoading: true,
    });

    // Fake an AJAX call
    setTimeout(() => {
      const suggestions = getMatchingOptions(value);

      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions,
        });
      } else {
        // Ignore suggestions if input value changed
        this.setState({
          isLoading: false,
        });
      }
    }, 1000);
  }

  // input 的 onChange屬性
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // 如何渲染 suggestions
  renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

  // 設定當suggestion 被點擊時, 什麼資料設為input value
  getSuggestionValue = (suggestion) => suggestion.name;

  // 輸入內容後,找尋Suggestions
  onSuggestionsFetchRequested = ({ value }) => {
    if (this.state.suggestions) {
      this.debouncedLoadSuggestions(value);
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions, isLoading } = this.state;

    // input 屬性的設定
    const inputProps = {
      placeholder: INPUT_PLACEHOLD,
      value,
      onChange: this.onChange,
    };

    return (
      <SearchBarContainer>
        <Spinner
          className="fas fa-spinner spinner"
          isLoading={isLoading}
        ></Spinner>

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          theme={theme}
        />
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
