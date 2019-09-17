cupid-sdk-js 使用者說明文件
===

## Installation
#### In a browser
```javascript
<script>
  window.cupid={init:function(t){var e,n,o;document.getElementById("cupid-js")||((e=document.createElement("script")).type="text/javascript",e.id="cupid-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"api.awoo.org/libs/cupid-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  cupid.init(() => {
    const cupidSDK = new CupidSDK('id', 'token');
    /*頁面商品顯示數量設定*/
    cupidSDK.setLimit(12);
    
    /*頁面渲染範例*/
    cupidSDK.renderSuggestionTag();
    cupidSDK.renderProductList();
    cupidSDK.renderProductTag();

    /*資料存取範例*/
    (async() => {
      console.log(await cupidSDK.getContentAll('日本,面膜'));
      console.log(await cupidSDK.getProductTags());
    })();
  });
</script>
```

#### Node Usage
```shell=
$ npm i @awootaiwan/cupid-sdk-js
or
$ yarn add @awootaiwan/cupid-sdk-js
```

#### Node Example
```javascript
import CupidSDK from '@awootaiwan/cupid-sdk-js';

const cupidSDK = new CupidSDK('id', 'token');
(async() => {
  console.log(await cupidSDK.getContentAll('日本,面膜'));
})();
```

### Prodruct List and Suggestion
#### html需要 cupid-suggestion-tag 區塊 跟 cupid-product-list 區塊才會渲染畫面
```htmlmixed=
  <div id="cupid-suggestion-tag"></div>
```
執行`cupidSDK.renderSuggestionTag()`會自動渲染以下畫面

![](https://i.imgur.com/UeMKscb.png)

```htmlmixed=
  <div id="cupid-product-list"></div>
```
執行`cupidSDK.renderProductList()`會自動渲染以下畫面

![](https://i.imgur.com/g7NN7Gr.png)
![](https://i.imgur.com/apGYf0k.png)

#### 參數設定
網址
`http://example.com/?tags=韓國,口紅&limit=10&sort=8&page=1`
1. tags(**不可為空**) : string 
2. page(預設為1) : int
3. sort(預設為8) : int
4. limit(預設為10) : int

### Product Tags
#### html需要 cupid-product-tag 區塊才會渲染畫面
```htmlmixed=
  <div id="cupid-product-tag"></div>
```
#### html需要 data-cupid-product-id，才能取得商品 id
請在商品頁上增加 id="data-cupid-product-id"，置入任何html標籤都可以。
再將商品id帶入此標籤的data屬性內。
```htmlmixed=
  <span id="data-cupid-product-id" data-cupid-product-id="1234567">
  </span>
```
執行`cupidSDK.renderProductTag()`會將cupid標籤渲染至標籤 `id="data-cupid-product-id"` 內，以下畫面為範例：

![](https://imgur.com/y6J2z83.png)

***

## Error Message

### Using Error
沒有畫面，空白一片，請查看console的錯誤顯示，有以下的情況：

1. ID 或 Token 未填入時，console會出現以下Message
![](https://i.imgur.com/3vuVeYg.png)

2. 未在 html 內放置 cupid-product-list、cupid-suggestion-tag、cupid-product-tag區塊，console會出現以下Message
![](https://i.imgur.com/CBXTZ0f.png)

3. 未在 html 內放置 data-cupid-product-id區塊，console會出現以下Message
![](https://imgur.com/fED1vd2.png)


### API Error
當API出現Error時，畫面呈現：
![](https://i.imgur.com/5hLc4yv.png)

當請求cupid API失敗時
```jsonld=
{
  "errcode": 10000
  "errmsg": "Request to cupid API failed."
  "result": ""
}
```

當沒有傳入tags參數時
```jsonld=
{
  "errcode": 10001
  "errmsg": "No tags provided."
  "result": ""
}
```
***

## API 說明文件
* [Nununi Content API Document](https://awootaiwan.github.io/awoo_wiki/nununi/nununi_Content_API_v1_2.html)
* [Nununi Product Tags API Document](https://wiki.awoo.org/nununi/products/v2.2#GET-Products-get-Tags)

## Cupid API
使用方式
```javascript
  (async() => {
    console.log(await cupidSDK.getContentAll('日本,面膜'));
  })
```
### getContentAll()
`Input`
1. tags(**不可為空**) : string 
2. page(預設為1) : int
3. sort(預設為8) : int
4. limit(預設為10) : int

`Output`
```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "pageInfo": {
      "title": "xxxxx",
      "description": "xxxxxx",
      "openGraph": {
        "title": "xxxxx",
        "description": "xxxxxx",
        "siteName": "xxxx",
        "url": "https://xxxxx.xxx.xxx",
        "image": "https://xxxx.xxxx.xxx",
        "type": "website"
      },
      "canonical": "https://customerHost.com/xxxx",
      "schema": {
        "breadcrumbs": "{xxxxxx}"
      },
      "intro": "xxxxxx",
      "h1": "xxxxxx"
    },
    "categoriesTags": {
    },
    "suggestionTags": [
      {
        "text": "tags文字",
        "link": "tags連結"
      }
    ],
    "products": [
      {
        "productId": "A123456",
        "productName": "xxxxxx",
        "url": "https://xxx.xxx.xxx/xxx",
        "productImageUrl": "https://xxx.xxx.xxx/xxx.xxx",
        "productBrand": "xxx",
        "productPrice": 111,
        "productSalePrice": 99
      }
    ],
    "productsTotal": 99
  }
}
```

### getContentPageInfo()
`Input`
1. tags(**不可為空**) : string 

`Output`
```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "title": "xxxxx",
    "description": "xxxxxx",
    "openGraph": {
    "title": "xxxxx",
      "description": "xxxxxx",
      "siteName": "xxxx",
      "url": "https://xxxxx.xxx.xxx",
      "image": "https://xxxx.xxxx.xxx",
      "type": "website"
    },
    "canonical": "https://customerHost.com/xxxx",
    "schema": {
      "breadcrumbs": "{xxxxxx}"
    },
    "intro": "xxxxxx",
    "h1": "xxxxxx"
  }
}
```

### getContentSuggestionTags()
`Input`
1. tags(**不可為空**) : string 

`Output`
```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": [
    {
      "text": "tags文字",
      "link": "tags連結"
    }
  ]
}
```

### getContentProducts()
`Input`
1. tags(**不可為空**) : string 
2. page(預設為1) : int
3. sort(預設為8) : int
4. limit(預設為10) : int

`Output`
```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "items": [
      {
        "productId": "A123456",
        "productName": "xxxxxx",
        "url": "https://xxx.xxx.xxx/xxx",
        "productImageUrl": "https://xxx.xxx.xxx/xxx.xxx",
        "productBrand": "xxx",
        "productPrice": 111,
        "productSalePrice": 99
      }
    ],
  }
}
```

### getProductTags()
`無 Input`

`Output`
full_link 是客戶的api base + link欄位，此處使用full_link做tag的連結。

```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "tags": [
     {
       "text": "TagA",
       "link": "linkA",
       "full_link": "awoo.com.tw/product-list/?label=linkA"
     }
  }
}
```
