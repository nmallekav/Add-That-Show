var mongoose = require('mongoose');
mongoose.Promise = global.Promise

var commentsSchema = new mongoose.Schema({
  comment : {
    type : String
  }
});

var reviewSchema = new mongoose.Schema({
    username: {
      type: String
    },
  
    title: {
      type: String
    },
  
    type: {
      type: String
    },
  
    seasons: {
      type: Number
    },
  
    episodes: {
      type: Number
    },
  
    rank: {
      type: Number, 
      min: 0,
      max: 10
    },

    clip : {
      type: String
    },

    comment : [commentsSchema]
  });


  var Review = mongoose.model('Review', reviewSchema);
  module.exports = Review;
  
  
  
  