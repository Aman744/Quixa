
const firebaseConfig = {
  apiKey: "AIzaSyDrKaWB2KbZ9lB0au2cTm1SNq11gQLsl08",
  authDomain: "quixa-article.firebaseapp.com",
  databaseURL: "https://quixa-article-default-rtdb.firebaseio.com",
  projectId: "quixa-article",
  storageBucket: "quixa-article.appspot.com",
  messagingSenderId: "943403261797",
  appId: "1:943403261797:web:3d63f2bad99ca49b014b8c"
};


firebase.initializeApp(firebaseConfig);


// Push Data to Firebase

var quixaArticlesData = firebase.database().ref("quixaArticles/pending");

document.getElementById('quixaArticles').addEventListener("submit", submitForm);
// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var currentDate = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();


function submitForm(e) {
  e.preventDefault();
 

  var category = getElementVal('category');
  var title = getElementVal('title');
  var story = getElementVal('story');
  var source = getElementVal('source');
  var tags = getElementVal('tags');
  var status = getElementVal('status');
  var language = getElementVal('language');
  var img = getElementVal('img');

  
  console.log(category, title, story, source, tags, status, language, img,currentDate, time );
  saveArticlesData(category, title, story, source, tags, status, language, img,currentDate, time );

  document.getElementById('quixaArticles').reset();
    
 

}

const saveArticlesData = (category, title, story, source, tags, status, language, img,currentDate, time ) => {

  var newquixaArticles = quixaArticlesData.push();

  newquixaArticles.set({
    category: category,
    title: title,
    story: story,
    source: source,
    tags: tags,
    status: status,
    language: language,
    img : img,
    currentDate : currentDate,
    time : time ,

  });

};


const getElementVal = (id) => {
  return document.getElementById(id).value;
};
  
// Get Data from Firebase

quixaArticlesData.once('value', function (snapshot) {
  console.log(snapshot.val());
  if (snapshot.exists()) {
    var content = '';
    
    snapshot.forEach(function (data) {
     
      var val = data.val();
      var key = data.key;
      content += '<div class="container my-4">'+
      '<div class="row">'+
      '<div class="col-12 col-lg-12 col-md-12 col-sm-12">'+
      '<div class="card py-4 px-4">'+
      '<div class="row">'+
      '<div class="col-lg-4 col-md-4 col-sm-12">'+
      '<img src= '+ val.img + ' class="img-fluid" alt=' + val.img + '  />'+
      '</div>'+
      '<div class="col-lg-8 col-md-8 col-sm-12">'+
      '<div class="card-body">'+
      '<div class="row">'+
      '<div class="col-lg-6 col-md-6 col-sm-6">'+
      '<div class="">Key ' + key + '</div>'+
      '<div class="">Status - ' + val.status + '</div>'+
      '</div> '+
      '<div class="col-lg-6 col-md-6 col-sm-6">'+
      '<div class="justify-content-end d-flex">Language - ' + val.language + '</div>'+
      '</div> '+
      '</div>'+
      '<h5 class="card-title">' + val.title + '</h5>'+
      '<p class="card-text">' + val.story + '</p>'+
      '<div class="row ">'+
      '<div class="col-lg-4 col-md-4 col-sm-12 ">'+
      '<div class="">Category - ' + val.category + '</div>'+
      '</div> '+
      '<div class="col-lg-4 col-md-4 col-sm-12">'+
      '<div class="">tags - ' + val.tags + '</div>'+
      '</div> '+
      '<div class="col-lg-4 col-md-4 col-sm-12">'+
      '<a href=' + val.source + ' class="">Source</a>'+
      '</div> '+
      '</div>'+
      '<a href="#myModal" class="btn btn-primary divClass"  data-toggle="modal" data-target="#myModal">Source</a>'+
      // '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal">Open Modal' 
      // '</button>' +
      '</div> '+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>';
      content += '<div class="modal fade" id="myModal" role="dialog">'+
                    '<div class="modal-dialog">'+
                      '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<div class="row">'+
                                '<div class="col-md-10"><h5> ' + key + ' </h5></div>'+
                                    '<div class="col-md-2">'+
                                     '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '<div class="modal-body">'+
                          '<p>'+ val.source +'</p>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                          '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                        '</div>'+
                      '</div>'+
                      
                    '</div>'+
                  '</div>';

                
      
    });
    $('#showQuixaArticles').append(content);
  }
});


// From Reset

function formReset() {
  document.getElementById("quixaArticles").reset();
};

//Title character count
$('#title').keyup(function(){textCheck('#title');});

//Story character count
$('#story').keyup(function(){textCheck('#story');});

// Function to check Text Count
function textCheck(element){
    var length = $(element).val().length;
    var maxLength = $(element).attr('maxlength');
    var remaining = maxLength - length;
  $(element + 'Count').html(remaining + ' characters remaining');
textAlert(remaining, element, 20);
};

// Function to show Alert in Red
function textAlert(length, element, alert){
  if (length <= alert){
    $(element + 'Count').css('color', 'red');
    }
    else if (length >= alert){
        $(element + 'Count').css('color', 'gray');}
};