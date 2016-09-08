  // "body-parser": "^1.15.2",
  //   "cheerio": "^0.22.0",
  //   "express": "^4.14.0",
  //   "express-handlebars": "^3.0.0",
  //   "mongoose": "^4.6.0",
  //   "request": "^2.74.0"

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cheerio = require("cheerio");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var request = require("request");

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

app.get('/', function(req, res){
  request('https://www.bloomberg.com/', function(err, response, html){

      if (err) {
        throw err;
      }
    
        //console.log("this is our html: ", html);

    // this is set up to use cheerio. the $ is not jQuery
      var $ = cheerio.load(html);
        var results =[];

            // now use jQuery 
              $('div.hero-v6-story').each(function (index, element){
                
                  var title = $(element).text();
                  var link = $(element).find('a').first().attr('href');


                     console.log("here is your link: " + link);
                     console.log("here is the TITLE: " + title);

              })
              console.log("here are your results: " + results);

  })
})

app.listen(PORT, function(){
console.log("PORT is listening on: " + PORT);
});

