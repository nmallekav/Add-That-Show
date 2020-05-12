var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var PORT = 3000;
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var _ = require("underscore");
var dataUtil = require("./data-util");

var _DATA = dataUtil.loadData().anime_post;

//For mongodb connection
var mongoose = require('mongoose');
var dotenv = require('dotenv');
mongoose.Promise = global.Promise
var Review = require('./show');

dotenv.config();
console.log(process.env.MONGODB); 
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

//For socket connection
var http = require('http').Server(app);
var io = require('socket.io')(http);

//For string validator
var validator = require('validator');

//For youtube video title
var getYoutubeTitle = require('get-youtube-title')


io.on('connection', function(socket) {
  console.log('NEW connection.');
  socket.on('disconnect', function(){
      console.log('Oops. A user disconnected.');
  });
});

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  Review.find({}, function(err, animes) {
    var usern = dataUtil.getNames(animes);

    res.render('home', {animes: animes, user: usern});
  }); 
})

app.get('/create', function(req, res) {
  var usern = dataUtil.getNames(_DATA);
  res.render('create', {user: usern});
})

app.post('/api/create', function(req, res) {

  getYoutubeTitle((req.body.clip).split('v=').pop(), function (err, title) {
    if (validator.isURL(req.body.clip)) {

      var review = new Review({
      username: req.body.username,
      title: req.body.title,
      type: req.body.type,
      seasons: parseInt(req.body.seasons),
      episodes: parseInt(req.body.episodes),
      rank: parseInt(req.body.rank),
      clip: title
    }); 

    review.save(function(err) {
      if (err) throw err;
      io.emit('new anime listing', review);
      return res.redirect("/"); 
    });
  } else {
    res.send("not actual URL was put in");
  }
  });
});

app.get('/addComment', function(req, res) {
  res.render('comment');
});

app.post('/api/addComment', function(req, res) {
  Review.findOne({ username: req.body.username }, function(err, anime) {
    
    anime.comment.push(req.body.comm);
    
    anime.save(function(err) {
      return res.redirect("/"); 
    });

});
});

app.get('/post/:name', function(req, res) {

  Review.find({}, function(err, animes) {
    var _name = req.params.name;
    var dataOnUser = dataUtil.getDataOnUser(animes, _name);
    var usern = dataUtil.getNames(animes);

    if (!dataOnUser) return res.render('404');
    res.render('post', {data: dataOnUser, name: _name, user : usern});
  }); 
  
});


app.get('/nav/:word', function(req, res) {
  Review.find({}, function(err, animes) {
    var name = req.params.word;
    var data = dataUtil.getSpecificData(animes, name);
    var usern = dataUtil.getNames(animes);

    res.render('nav', {data : data, user : usern});
  }); 
});

app.get('/api/getAnime', function(req, res) {
  Review.find({}, function(err, animes) {
    res.send(_DATA);
  }); 
});


app.delete('/anime/:id', function(req, res) {
  Review.findByIdAndRemove(req.params.id, function(err, movie) {
      if (err) throw err;

      if(!movie){return res.send('No anime with that id');}
      res.send('Anime deleted!');
  });
});

app.delete('/lastComment/:id', function(req, res) {
  Review.findOne({ _id: req.params.id }, function(err, anime) {
    if (err) throw err;
    if (!anime) return res.send('No movie found with that ID.');

    anime.reviews.pop();

    movie.save(function(err) {
        if (err) throw err;
        res.send('Sucessfully added review.');
    });
});
});

app.get('/about', function(req,res) {
  Review.find({}, function(err, animes) {
    var usern = dataUtil.getNames(animes);

    res.render('about', {user: usern});
  }); 
});

http.listen(PORT, function() {
    console.log('Listening on port 3000!');
});
