var progressBar = document.getElementById('progressBar');
var uploadImage = document.getElementById('uploadImage');

uploadImage.addEventListener('change', function(e){
var file = e.target.files[0];
var storageRef = firebase.storage().ref('img/'+file.name);
var task = storageRef.put(file);
console.log(file)
task.on('state_changed', function progress(snapshot) {
  var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
  progressBar.value = percentage;

}, 
function error(err) {


},
function() {
  task.snapshot.ref.getDownloadURL().then(function(url){
    ImgUrl = url;
    console.log(ImgUrl)
    document.getElementById("img").value = ImgUrl;
    console.log(img)
});
});})