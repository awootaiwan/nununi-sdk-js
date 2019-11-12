# nununi-sdk-js

[![npm (tag)](https://img.shields.io/npm/v/@awootaiwan/nununi-sdk-js/latest?color=red)](https://www.npmjs.com/package/@awootaiwan/nununi-sdk-js) [![cdn](https://img.shields.io/badge/cdn-latest-orange)](https://api.awoo.org/libs/nununi-sdk-latest.min.js) ![GitHub issues](https://img.shields.io/github/issues/awootaiwan/nununi-sdk-js) ![GitHub pull requests](https://img.shields.io/github/issues-pr/awootaiwan/nununi-sdk-js)

## Installation

#### In a browser

```javascript
<script>
  window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="nununi-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"api.awoo.org/libs/nununi-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  nununi.init(() => {
    const nununiSDK = new NununiSDK('id');

    /*頁面商品顯示數量設定*/
    nununiSDK.setLimit(12);

    /*頁面渲染範例*/
    nununiSDK.renderSuggestionTag();
    nununiSDK.renderProductList();

    /*資料存取範例*/
    (async() => {
      console.log(await nununiSDK.getContentAll('日本,面膜'));
    })();
  });
</script>
```

#### Node Usage

```
$ npm i @awootaiwan/nununi-sdk-js
or
$ yarn add @awootaiwan/nununi-sdk-js
```

#### Node Example

```javascript
import NununiSDK from "@awootaiwan/nununi-sdk-js";

const nununiSDK = new NununiSDK("id");
(async () => {
  console.log(await nununiSDK.getContentAll("日本,面膜"));
})();
```

## Develop

### Installing

```
$ git clone https://github.com/awootaiwan/nununi-sdk-js.git
$ cd nununi-sdk-js
$ npm install
$ vim .env
```

內容如下

```
NUNUNI_ID=xxxxxx   #請輸入nununiId
NUNUNI_DOMAIN=http://example.com #請輸入 api網址
```

開發上如果有需要用到 api 網址可使用如下的程式碼

```
const api = `${process.env.NUNUNI_DOMAIN}/nununi/latest/${process.env.NUNUNI_ID}/content`;
```

### Dev

```
$ npm start
$ open http://localhost:3000
```

### Build

```
$ npm run build:app
```

### Build by your self.

Update `.env` to your dev / personal endpoint.

Update `demo/index.html` content, js replace from

```
window.nununi={init:function(t){var e,n,o;document.getElementById("nununi-js")||((e=document.createElement("script")).type="text/javascript",e.id="nununi-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"localhost:9080/nununi-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};
```

Tips: `npm install -g static-server`

```
npm run build:app
open demo/index.html
cd production && static-server
```
