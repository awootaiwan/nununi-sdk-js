import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/siteSearch/SearchBar';

const App = () => (
  <div>
    <SearchBar />
  </div>
);

class SiteSearchSDK {
  renderView() {
    const siteSearchID = document.getElementById('siteSearch');
    ReactDOM.render(<App />, siteSearchID);
  }
}

var root =
  // eslint-disable-next-line no-restricted-globals
  (typeof self == 'object' && self.self === self && self) ||
  (typeof global == 'object' && global.global === global && global);

module.exports = root.SiteSearchSDK = SiteSearchSDK;
