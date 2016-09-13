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

}); //this is end of document.click