# 한빛 노드 보일러플레이트
- 내가 쓰기 위해 만드는 것

# 각 경로별 접근방법
## import
아래는 예시 경로이다.
자세한 내용은 package.json 의 imports 구절을 참고하기 바람.
- [레퍼런스](https://elfinlas.github.io/node-js/220228_node-absolute-path/)
```json
{
  "imports": {
      "#extension/*": "./src/extension/*",
      "#views/*": "./src/views/*",
      "#configure/*": "./src/configure/*",
      "#auth/*": "./src/auth/*"
  }
}
```
```js
import * as IniParser from "#extension/IniParser.js";
```
위의 방식으로 import 하여 사용할 수 있음.

# 확장기능 사용방법
## dotenv
```js
const dotenv = require('dotenv');
dotenv.config();
```
위의 명령을 사용하면 환경변수를 .env 파일의 데이터로 Override 할 수 있음.

## ini
[레퍼런스](https://junhokims.tistory.com/40) 페이지를 참고하기 바람.
- mysql.ini
```ini
[database]
host=1.1.1.1
id=root
password=1234
```

- mysql.js
```js
import * as IniParser from "#extension/IniParser.js";
var config = new IniParser("mysql.ini");
await config.load();

// use case
config.get("database.host"); // => output : 1.1.1.1
```
되도록이면 ini 보다는 dotenv가 사용하기 편할 것으로 보임.

## express
```js
const express = require('express');
const app = express();

// 중간에 들어갈 라우팅 규칙이나 기타 코드들이 여기에 삽입 될 예정

app.listen(<포트>, <서버주소=127.0.0.1/0.0.0.0>, () => {
    // 콘솔에 보일 로그
    console.log(`서버가 서버주소:포트 에서 실행되었습니다.`);
});
```
### submodule [bodyParser]
- bodyParser가 express 특정 버전에는 포함되는 경우가 있기는 하지만, 떨어지는 경우도 있기 때문에 부득이하게 따로 설치하는게 유리할 것 같아서 아예 설치하는 부분으로 가게 되었음.
```js
app.use(bodyParser.json());
app.use(
bodyParser
    .urlencoded({
        extended: true
    })
);
```

### 뷰 엔진(view engine)
[레퍼런스](https://velog.io/@over/Node.js-View-Engine-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)
```js
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/src/views'));
```

### 라우팅
- GET
```js
app.get('/<경로>', (req, res) => {
  res.render('<뷰 파일 이름>');
});
```

- POST
```js
app.get('/<경로>', (req, res) => {
  res.render('<뷰 파일 이름>');
});
```

- 동적경로
```js
app.get('/<경로>/:동적경로1/<블라블라>/:동적경로2', (req, res) => {
  // 사용방법
  // 동적경로는 req.params 변수에 담겨있음.
  // req.params.동적경로1, req.params.동적경로2 와 같이 사용 가능
});
```

- URL 파라미터
- /<경로>?param=123&abcd=efgh
```js
app.get('/<경로>', (req, res) => {
  // 사용방법
  // req.query 변수에 담기게 됨.
  // req.query.param, req.query.abcd 와 같이 사용 가능
});
```

### HEADER (헤더 가져오기 / 헤더 반환(설정)하기)
위의 라우팅 규칙 내에서 사용한다.

- 헤더 가져오기
```js
const headers = req.headers;
// 아래와 같이 사용한다.
// const userAgent = req.headers['user-agent'];
```

- 헤더 반환하기
```js
// 단일 헤더 반환
res.header('Content-Type', 'application/json; charset=utf-8');

// 디중 헤더 반환
res.set({
    'X-Version': '1.1.1',
    'X-PHP': 'Like'
});
```