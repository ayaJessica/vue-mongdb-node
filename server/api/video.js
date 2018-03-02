const express = require('express');
const router = express.Router();
const Video = require('../models/video');
console.log('in');

router.get('/videos/:id',(req,res,next) => {
  const id = req.params.id;
  console.info('id='+id);
  Video.findById({_id:id}).then(video => {
    console.info(video);
    res.send(video);
  }).catch(next);
})

router.get('/videos',(req,res,next) => {
  console.log('in2');
  const p = req.query.p ||1;
   const limitNum = 15;
   Video.find({}).count().then((count) => {
     let total = count;
    Video.find({}).sort({created_at:-1}).skip((p - 1) * limitNum).limit(limitNum).then(videos => {
      console.log(total);
      res.send({
       total,
         videos
    })
     })
  })
})

module.exports = router
