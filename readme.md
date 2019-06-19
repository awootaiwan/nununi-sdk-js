cupid-sdk-js
===
## Installing
```
$ git clone https://github.com/awootaiwan/cupid-sdk-js.git
$ cd cupid-sdk-js
$ npm install
$ touch .env
$ vim .env
```
內容如下
```
NUNUNI_ID=xxxxxx   #請輸入nununiId
NUNUNI_TOKEN=xxxxxxxxxxxxxxxxxxxxx   #請輸入accessToken
NUNUNI_DOMAIN=http://example.com #請輸入 api網址
NUNUNI_APIVER= v1.2                   #請輸入api版本號
NUNUNI_APINAME=content           #請輸入api函式名稱
```

開發上如果有需要用到api網址可使用如下的程式碼
```
const api = `${process.env.NUNUNI_DOMAIN}/${process.env.NUNUNI_APIVER}/${process.env.NUNUNI_ID}/${process.env.NUNUNI_APINAME}`;
```

## Dev
```
$ npm start
$ open http://localhost:3000
```

## Build
```
$ npm run build
```

## Demo
```
$ npm run demo
$ open http://localhost:3001
```