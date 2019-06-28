cupid-sdk-js 使用者說明文件
===
## Installation
```html=
<script type="text/javascript" async  onload="init()" src="./js/app.js"></script>
```

## Usage
```javascript=
<script>
  function init() {
    window.CupidSDK.init({id : process.env.NUNUNI_ID, token : process.env.NUNUNI_TOKEN});
    window.CupidSDK.renderSuggestionTag();
    window.CupidSDK.renderProductList();
  }
</script>
```


## html需要有 suggestion-tag 區塊 跟 product-list 區塊才會渲染畫面
```htmlmixed=
  <div id="cupid-suggestion-tag"></div>
```
執行`CupidSDK.renderSuggestionTag()`會自動渲染以下畫面

![](https://i.imgur.com/UeMKscb.png)

```htmlmixed=
  <div id="cupid-product-list"></div>
```
執行`CupidSDK.renderProductList()`會自動渲染以下畫面

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

2. 未執行 init 時，console會出現以下Message
![](https://i.imgur.com/ckMYhs8.png)

3. 未填入 product-list 區塊，console會出現以下Message
![](https://i.imgur.com/CBXTZ0f.png)


### API Error

當API出現Error時，畫面呈現：
![](https://i.imgur.com/5hLc4yv.png)





