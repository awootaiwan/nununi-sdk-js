cupid-sdk-js 使用者說明文件
===
## Installation

#### In a browser
```javascript
<script>
  window.cupid={init:function(t){var e,n,o;document.getElementById("cupid-js")||((e=document.createElement("script")).type="text/javascript",e.id="cupid-js",e.async=!0,e.src=("https:"===document.location.protocol?"https://":"http://")+"api.awoo.org/libs/cupid-sdk-latest.min.js",(o=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,o)),n=window.onload,window.onload=function(){return n&&n(),t()}}};

  cupid.init(() => {
    const cupidSDK = new CupidSDK('id', 'token');
    /*頁面渲染範例*/
    cupidSDK.renderSuggestionTag();
    cupidSDK.renderProductList();

    /*資料存取範例*/
    (async() => {
      console.log(await cupidSDK.getContentAll('日本,面膜'));
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


## html需要有 suggestion-tag 區塊 跟 product-list 區塊才會渲染畫面
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

## 參數設定
網址
`http://example.com/?tags=韓國,口紅&limit=10&sort=8&page=1`
1. tags(**不可為空**) : string 
2. page(預設為1) : int
3. sort(預設為8) : int
4. limit(預設為10) : int

## API
[Nununi Content API Document](https://awootaiwan.github.io/awoo_wiki/nununi/nununi_Content_API_v1_2.html)

## Error Message

### Using Error
沒有畫面，空白一片，請查看console的錯誤顯示，有以下的情況：

1. ID 或 Token 未填入時，console會出現以下Message
![](https://i.imgur.com/3vuVeYg.png)

2. 未填入 product-list 區塊，console會出現以下Message
![](https://i.imgur.com/CBXTZ0f.png)


### API Error

當API出現Error時，畫面呈現：
![](https://i.imgur.com/5hLc4yv.png)


## Cupid content API
使用方式
```javascript
  (async() => {
    console.log(await cupidSDK.getContentAll('日本,面膜'));
  })
```
### Error

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
