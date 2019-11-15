
### Product Classify

##### html 需要 nununi-classify 區塊才會渲染畫面

```htmlmixed=
  <div id="nununi-classify"></div>
```

##### 參數設定的兩種方法：

- 直接代入商品 id 陣列。
  nununiSDK.getClassify 取得資料，nununiSDK.renderClassify 取得資料並渲染畫面。

```javascript
nununiSDK.renderClassify(["PRODUCT-ID", "PRODUCT-ID"]);
nununiSDK.getClassify(["PRODUCT-ID", "PRODUCT-ID"]);
```

- 請在商品頁上的任一 div、a、span 標籤內增加 data 屬性 `data-nununi-product-id`，且代入商品 id。
  `nununiSDK.renderClassify()` 會搜尋頁面上所有`data-nununi-product-id`的標籤。

```htmlmixed=
  <span data-nununi-product-id="1234567"></span>
  <span data-nununi-product-id="2230982"></span>
  <span data-nununi-product-id="5409124"></span>
  <span data-nununi-product-id="9120988"></span>
```

執行`nununiSDK.renderClassify()`會將 nununi 標籤渲染至標籤 `id="nununi-classify"` 內，以下畫面為範例：

![](https://imgur.com/lDxXMo5.png)
