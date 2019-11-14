# nununi-sdk-js 使用者說明文件

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
    nununiSDK.renderProductTag();
    nununiSDK.renderClassify();

    /*資料存取範例*/
    (async() => {
      console.log(await nununiSDK.getContentAll('日本,面膜'));
      console.log(await nununiSDK.getProductTags('11111'));
      console.log(await nununiSDK.getClassify(['11111','22222']));
    })();
  });
</script>
```

#### Node Usage

```shell＝
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

---

### Prodruct List and Suggestion

##### html 需要 nununi-suggestion-tag 區塊 跟 nununi-product-list 區塊才會渲染畫面

```htmlmixed=
  <div id="nununi-suggestion-tag"></div>
```

執行`nununiSDK.renderSuggestionTag()`會自動渲染以下畫面

![](https://i.imgur.com/UeMKscb.png)

```htmlmixed=
  <div id="nununi-product-list"></div>
```

執行`nununiSDK.renderProductList()`會自動渲染以下畫面

![](https://i.imgur.com/g7NN7Gr.png)
![](https://i.imgur.com/apGYf0k.png)

#### 參數設定

網址
`http://example.com/?tags=韓國,口紅&limit=10&sort=8&page=1`

1. tags(**不可為空**) : string
2. page(預設為 1) : int
3. sort(預設為 8) : int
4. limit(預設為 10) : int

---

### Product Tags

##### html 需要 nununi-product-tag 區塊才會渲染畫面

```htmlmixed=
  <div id="nununi-product-tag"></div>
```

##### 參數設定的兩種方法：

- 直接代入商品 id 參數。
  nununiSDK.getProductTags 取得資料，nununiSDK.renderProductTag 取得資料並渲染畫面。

```javascript
nununiSDK.renderProductTag("PRODUCT-ID");
nununiSDK.getProductTags("PRODUCT-ID");
```

- 請在商品頁上的任一 div、a、span 標籤內增加 data 屬性 `data-nununi-product-id`，且代入商品 id。
  執行 `nununiSDK.renderProductTag()` 會搜尋第一個有`data-nununi-product-id`的標籤。

```htmlmixed=
  <span data-nununi-product-id="1234567">
  </span>
```

執行`nununiSDK.renderProductTag()`會將 nununi 標籤渲染至標籤 `id="nununi-product-tag"` 內，以下畫面為範例：

![](https://imgur.com/y6J2z83.png)

### Product Classify

```htmlmixed=
  <div id="nununi-classify"></div>
```


### Product Classify

##### html 需要 nununi-classify 區塊才會渲染畫面

```htmlmixed=
  <div id="nununi-classify"></div>
```

##### 參數設定及使用方式：


```javascript
// nununiSDK.renderClassifyProductType("PRODUCT_TYPE_A>PRODUCT_TYPE_B>PRODUCT_TYPE_C");
nununiSDK.renderClassifyProductType("熱銷推薦>201909新品上市>");
```


![](https://imgur.com/lDxXMo5.png)

---

### API Error

當 API 出現 Error 時，畫面呈現：
![](https://i.imgur.com/5hLc4yv.png)

當請求 nununi API 失敗時

```jsonld=
{
  "errcode": 10000
  "errmsg": "Request to nununi API failed."
  "result": ""
}
```

當沒有傳入 tags 參數時

```jsonld=
{
  "errcode": 10001
  "errmsg": "No tags provided."
  "result": ""
}
```

---

## CSS 樣式修改
只要加上 id 選擇器的權重，就可輕鬆覆蓋原生樣式。

#### product tag 修改範例

```
#nununi-product-tag .nununi-tag {
// 修改樣式
  display: inline-block
  font-size: 18px;
  background: #d4aaa;
}
```

#### classify 修改範例

```
#nununi-classify {
// 請加入欲修改的樣式
  background-color:#e2e2e2;
  padding:20px;
}
#nununi-classify .nununi-tag{
// 請加入欲修改的樣式
  display: inline-block
  font-size: 14px;
  background: #d4aaaa;
  border: 1px solid #ccc;
}
```
#### product list 修改範例

```
#nununi-product-list .master-container {
// 請加入欲修改的樣式
  padding-top: 30px;
}
#nununi-product-list .product-name {
// 請加入欲修改的樣式
  min-height: 40px;
  height: auto;
}
```

#### suggestion tag 修改範例

```
#nununi-suggestion-tag > div {
// 請加入欲修改的樣式
 background: transparent;
 border: none;
}

#nununi-suggestion-tag span {
// 請加入欲修改的樣式
  border: 1px solid #d4a6db;
  border-radius: 20px;
}
```

***

## API 說明文件

- [Nununi Content API Document](https://awootaiwan.github.io/awoo_wiki/nununi/nununi_Content_API_v1_2.html)
- [Nununi Product Tags API Document](https://wiki.awoo.org/nununi/products/v2.2#GET-Products-get-Tags)

## Nununi API

使用方式

```javascript
async () => {
  console.log(await nununiSDK.getContentAll("日本,面膜"));
  console.log(await nununiSDK.getProductTags("11111"));
  console.log(await nununiSDK.getClassify(["11111", "22222"]));
};
```

### getContentAll()

`Input`

1. tags(**不可為空**) : string
2. page(預設為 1) : int
3. sort(預設為 8) : int
4. limit(預設為 10) : int

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
2. page(預設為 1) : int
3. sort(預設為 8) : int
4. limit(預設為 10) : int

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

`Input`

1. productId(**不可為空**) : string

`Output`
fullLink 是客戶的 api base + link 欄位，此處使用 fullLink 做 tag 的連結。

```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "tags": [
     {
       "text": "TagA",
       "link": "linkA",
       "fullLink": "awoo.com.tw/product-list/?label=linkA"
     }
  }
}
```

### getClassify()

`Input`

1. productIds(**不可為空**) : array

`Output`
fullLink 是客戶的 api base + link 欄位，此處使用 fullLink 做 tag 的連結。

```jsonld=
{
  "errcode": 0,
  "errmsg": "ACK",
  "result": {
    "tags": [
     {
       "text": "TagA",
       "link": "linkA",
       "fullLink": "awoo.com.tw/product-list/?label=linkA"
     }
  }
}
```
