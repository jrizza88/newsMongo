// grab the articles as a json
  $.getJSON('/scrape', function(data) {
    console.log("data=",data);
    for (var i = 0; i<data.length; i++){
      //if there is a note on this article, attach *note* to the title to signify its existence to the user.
      if(data[i].note){
        noteExists = '<span style="color: orange"><sup> *note attached*</sup></span>'
        }else{
          noteExists = "";
      }
      $('#articles').append('<h2><p data-id="' + data[i]._id + '">' + data[i].title + noteExists+'</p></h2>'+'<a href='+data[i].link +' target = "_blank">'+data[i].link+"<br />");
      $('#articles').append("____________________________________________________________________________________________________________________");
    }
      $('#articles').append("____________________________________________________________________________________________________________________");
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
$('#notes').append('<input id="titleinput" + name="title" >');
    // a textarea to add a new note body
$('#notes').append('<textarea input="bodyinput" + name="body" ></textarea>');
     // a button to submit a new note, with the id of the article saved to it


      // if there's a note in the article
        if(data.note){
           // place the title of the note in the title input
          $('#titleinput').val(data.note.title);
          // place the body of the note in the body textarea
          $('#bodyinput').val(data.note.body);
          // this will delete the last note that user entered
          $('#notes').append('<button data-id="' +data._id + ' " id="deletenote">Delete Note</button>');
         } else {
          $('#notes').append('<button data-id="' + data._id + ' " id="savednote">Save Note</button>');
         }
      });
    }); //this is end of document.click


// when you click on savednote button 
$(document).on('click', '#savednote',function(){
  var thisId= $(this).attr('data-id')

  $.ajax({
    method: "POST",
    url: "/savednote" + thisId,
    data: {
      title: $('titleinput').val(),// value taken from title input
      body: $('bodyinput').val() // value taken from body put
    }
  })
  // with that done, add the savednote information to the page
  .done(function(data){
    console.log("saved note stuff" + data);

    $('#notes').empty();
  });

  location.reload();
    $('#titleinput').val("");
    $('#bodyinput').val("");

});
// when you click on deletenote button
$(document).on('click', '#deletenote', function(){
  var thisId= $(this).attr('data-id')


  $.ajax({
    method: "POST",
    url: "/deletenote" + thisId,
  })
  .done(function(data){
    console.log("delete note stuff" + data);

  $('#notes').empty();
});


location.reload();
  $('#titleinput').val("");
  $('#bodyinput').val("");

});








