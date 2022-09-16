
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

 var quixaArticlesData = firebase.database().ref("quixaArticles/pending");

 document.getElementById('quixaArticles').addEventListener("submit", submitForm);

 function submitForm(e){
    e.preventDefault();

    var category = getElementVal('category');
    var title = getElementVal('title');
    var story = getElementVal('story');
    var source = getElementVal('source');
    var tags = getElementVal('tags');
    var status = getElementVal('status');


    console.log(category, title, story, source, tags ,status);
    saveArticlesData(category, title, story, source, tags ,status);

    document.getElementById('quixaArticles').reset();

 }

const saveArticlesData = (category, title, story, source, tags, status) => {

    var newquixaArticles = quixaArticlesData.push();

    newquixaArticles.set({
        category :category,
        title : title,
        story : story,
        source : source,
        tags : tags,
        status : status,

    });

};



 const getElementVal = (id) => {
    return document.getElementById(id).value;
 };

 //get data

quixaArticlesData.once('value', function(snapshot){
  if(snapshot.exists()){
      var content = '';
      snapshot.forEach(function(data){
          var val = data.val();
          content +='<div class="card my-4" style="width: 100%;">';
          content +='<div class="card-body">'
          content += '<div class="">Category - ' + val.category + '</div>';
          content += '<h5 class="card-title">' + val.title + '</h5>';
          content += '<p class="card-text">' + val.story + '</p>';
          content += '<p class="card-text">Source - ' + val.source + '</p>';
          content += '<p class="card-text">Tags - ' + val.tags + '</p>';
          content += '</div>';
          content += '</div>';
          content += '</div>';
      });
      $('#showQuixaArticles').append(content);
  }
});

// clear data
$('#clear').click(function() {
  $('input-data').value="";
});

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
}

// Function to show Alert in Red
function textAlert(length, element, alert){
  if (length <= alert){
    $(element + 'Count').css('color', 'red');
    }
    else if (length >= alert){
        $(element + 'Count').css('color', 'gray');}
}
