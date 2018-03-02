const express = require('express')
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//添加一个用户，用户登录，注册
router.use('/users',(req,res,next) => {
  console.log('loginin');
  console.info(req.body);
  const { username, password , type } = req.body;
  if(type === 'signin'){//登录
    User.findOne({name:username}).then(user => {
      if(user != null){
        if(!bcrypt.compareSync(password,user.password)){
          res.json({
            success:false,
            message:'认证失败，密码错误'
          })
        }
        else{
          const userToken = {
            name : user.name,
            id:user._id
          }
          //秘钥
          const secret = 'vnpastime';
          //生成token,可以再加一个设置失效日期
          const token = jwt.sign(userToken,secret);
          res.json({
            success : true,
            message : '登陆成功',
            token : token
          })
        }
      }
      else{
        res.json({
          success : false,
          message : '用户不存在'
        })
      }
    }).catch(next);
  }
  else if(type === 'signup'){//注册
    User.findOne({name:username}).count().then(count => {
      if(count > 0 ){
        res.json({
          success : false,
          message : '用户名已存在'
        })
      }
      else{
        //密码加验处理
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
        const userInfo = {
          name : username,
          password : hash,
          avatar_url: 'http://i1.fuimg.com/605011/1f0138a7b101b0f1.jpg'
        }
        User.create(userInfo).then(user => {
          const userToken = {
            name : user.name,
            id : user._id
          }
          //密钥
          const secret = 'vnpastime';
          //生成token，可以在加一个设置失效日期
          const token = jwt.sign(userToken,secret)
          res.json({
            success : true,
            message : '注册成功',
            token : true
          })
        })
      }
    }).catch(next)
  }
})

module.exports = router;
