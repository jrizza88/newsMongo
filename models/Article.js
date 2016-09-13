
// require mongoose
var mongoose = require('mongoose');

// create the Schema class
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
title: {
    type: String,
    required: true,
    unique: true
},

link: {
    type: String,
    required: true,
    unique: true
},

note: {
    type:Schema.Types.ObjectId,
    ref: 'Note'
  }

});
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;