const express = require('express');
const app = express();
//bodyParser
const bodyParser = require('body-parser');
//router 연결
const routes = require('./src/router/routes')
//mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TodoDate" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongoDB connected');
}).catch(err => {
    console.log('failed to connect to mongoDB' , err)
});
//mongo schema
const Todo = require('./src/model/TodoSchema')

//mehtodOverride
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
//bodyParser 미들웨어 등록
app.use(bodyParser.urlencoded({extended: false}))
//public 미들웨어 등록
app.use(express.static(`${__dirname}/src/public`))

//views ejs
app.set('views' , './src/views')
app.set('view engine' , 'ejs')

//router 미들웨어 등록
app.use('/' , routes)

const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중.....`)
})