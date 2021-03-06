
// require mongoose
var mongoose = require('mongoose');

// create the Schema class
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
title: {
    type: String,
    required: true
  
},

link: {
    type: String,
    required: true

},

note: {
    type: Schema.ObjectId,
    ref: 'Note'
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;