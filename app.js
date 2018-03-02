const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const env = process.env.NODE_ENV || 'development';
const videoRouters = require('./server/api/video');
const userRoutes = require('./server/api/user');
var logger = require('morgan');
let dbUrl = 'mongodb://vn_runner:Xu510*@127.0.0.1:19999/vnpasttime';
if(env === 'development'){
  console.log('change');
  dbUrl = 'mongodb://localhost:27017/vnpastime';
}

mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json())

app.use('/aproxy',videoRouters);
app.use('/auth',userRoutes);


app.use((err,req,res,next) => {
  console.info(req.url);
  console.info(err)
  res.status(442).send({error:err.message})
})

const server = app.listen(4002,() => {
  console.log(`Express started in ${app.get('env')} mode on http://localhsot:4001`)
})
