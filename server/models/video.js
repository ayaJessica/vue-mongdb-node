const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  user : {
    name : String,
    avator : String,
    _is : String
  },
  id : Number,
  playUrl : String,
  coverSrc : String,
  videosrc : [
    {name : String, url : String}
  ],
  title : String,
  created_at :{type : Date,default : Date.now()},
  duration : Number,
  supportCount : Number,
  figheCount : Number,
  collectionCount : Number,
  playcount : Number
})

const Video = mongoose.model('Video',VideoSchema)

module.exports = Video;
