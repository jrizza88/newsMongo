// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
for (var i = 0; i < data.length; i++) {

  // display the apropos information on the page
  $('#articles').append('<p> data-id"' + data[i]._id'">' +data[i].title
    + data[i].link + '</p>');
  }
    
});

// whenever someone clicks a p tag
$(document).on('click', 'p', function(){


// empty the notes from the note section
$('#notes').empty();
// save the id from the p tag
var thisId = $(this).attr('data-id');



// now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,

  })

  // with that done, add the note information to the page
    .done(function(data){
      console.log(data);
   // the title of the article
$('#notes').append('<h3>' + data.title + '</h3>'); 
    // an input to enter a new title
$('#notes').append('input id="titleinput" + name="title" >');
    // a textarea to add a new note body
$('#notes').append('<textarea input="bodyinput" + name="body" ></textarea>');
     // a button to submit a new note, with the id of the article saved to it


      // if there's a note in the article
    })


}); //this is end of document.click