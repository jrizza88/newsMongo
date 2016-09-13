
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require('morgan');

var cheerio = require("cheerio");
var request = require("request");

//use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make a public static directory
app.use(express.static('public'));



//var databaseUrl = "news";

// will check back later if an array of stories makes sense. 
//var collections = ["stories"];

// use mongojs to hook the database to the db variable 
//var db = mongojs(databaseUrl, collections);

var mongodbUri = 'mongodb://heroku_llhsm7m5:slv8kb1hm88ms6rgrho6fqlp23@ds019846.mlab.com:19846/heroku_llhsm7m5';

mongoose.connect(mongodbUri);
var db = mongoose.connection;

var PORT = process.env.PORT || 8080;

db.on('error', function(err){
  console.log("Database error", err);
});

db.once('open', function(){
  console.log('Mongoose connection successful. ');
});

// bring in the Note and Article models
var Note = require('.models/Note.js');
var Article = require('.models/Article.js');


// Routes 

app.get('/', function (req, res){
  res.send(index.html);
});

app.get('/scrape', function(req, res){
  request('https://www.bloomberg.com/', function(err, response, html){

      if (err) {
        throw err;
      }
    
        //console.log("this is our html: ", html);

    // this is set up to use cheerio. the $ is not jQuery
      var $ = cheerio.load(html);
        

            // now use jQuery 
              //$('a.hero-v6-story_headline-link').each(function (index, element){
               $('article h1').each(function (index, element){ 
               // var result = {};
             var result = {};
            result.title = $(this).find('a').text();
            result.link = $(this).children('a').attr('href');

            // just in case bloomberg does not use their own URLs
            if (result.link.indexOf('http')<0) {
              result.link='www.bloomberg.com' + result.link;
            }
                
                 // var currentLink = {
                 // title : $(element).find('a').text(),
                 // link : $(element).children('a').attr('href')}
                 //result.thumbnail = $(this).children('a').attr('href');
 // console.log(currentLink);
 // result.push(currentLink);
 //console.log("here are your results: " + currentLink.title + currentLink.link);
 console.log("Title results: " + result.title);
 console.log("Link results: " + result.link);

 var entry = new Article(result);
// now, save that entry to the db
        entry.save(function(err, doc) {
          // log any errors
          if (err) {
            console.log(err);
          } 
          // or log the doc
          else {
            console.log(doc);
          }
              })


             

  })
})

var entry = new Article(result);
// now, save that entry to the db
        entry.save(function(err, doc) {
          // log any errors
          if (err) {
            console.log(err);
          } 
          // or log the doc
          else {
            console.log(doc);
          }
      })
  })
});
res.send

app.listen(PORT, function(){
console.log("PORT is listening on: " + PORT);
});

