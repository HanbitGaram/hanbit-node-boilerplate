const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({extended: true})
);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/src/views'));

// 중간에 들어갈 라우팅 규칙이나 기타 코드들이 여기에 삽입 될 예정

app.get('/', (req, res)=>{
    res.render('sample', {
        title: '테스트'
    });
});

app.listen(8080, '127.0.0.1', () => {
    // 콘솔에 보일 로그
    console.log(`서버가 서버주소:포트 에서 실행되었습니다.`);
});