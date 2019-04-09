// Initialize app
var myApp = new Framework7();
  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
})


var options = {
  quality: 30,
  correctOrientation: true,
}


function pics(){
  navigator.camera.getPicture(cameraCallback, onError, options);
}
var photo;

function cameraCallback(imageData) {
  var image = document.getElementById('myImage');
  image.src = imageData;
  photo = imageData;
  console.log("Image data"+imageData);
  //image.src = "data:image/jpeg;base64," + imageData;
  // print
  tryingFile();
  console.log("exit tryingfile");

}

function onError()
{
  console.log("error");
}

//////////////////////

////////////////////////////////////


// funtion to access to local storage
function tryingFile(){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
}
 
function fileSystemCallback(fs){
 
  // Name of the file I want to create
  var fileToCreate = "newPersistentFile.jpg";
 
  // Opening/creating the file
  fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);


}
 
var fileSystemOptionals = { create: true, exclusive: false };
 
function getFileCallback(fileEntry){

   var dataObj = new Blob([photo], { type: 'image/jpeg' });
  // Now decide what to do
  // Write to the file
  console.log(fileEntry);
  console.log(dataObj);
   console.log("entry writefile");
  writeFile(fileEntry, dataObj);
   console.log("entry readfile");
  // Or read the file
  readFile(fileEntry);

}

// Let's write some files
function writeFile(fileEntry, dataObj) {
 
  console.log("entry writefile2");
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) 
  {
 
      // If data object is not passed in,
      // create a new Blob instead.
 
      fileWriter.write(dataObj);
 
      fileWriter.onwriteend = function() {
          console.log("Successful file write...");
      };
 
      fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
      };
 
  });
}

 
// Let's read some files
function readFile(fileEntry) {
   console.log("entry readfile2");
  // Get the file from the file entry
  fileEntry.file(function (file) {
      
      // Create the reader
      var reader = new FileReader();
      reader.readAsBinaryString(file);
 
      reader.onloadend = function() {
 
          console.log("Successful file read: " + this.result);
          console.log("file path: " + fileEntry.fullPath);
          
 
      };
 
  }, onError);
}

function printFile(){
  console.log("entryprintfile");

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback2, onError);

}

function fileSystemCallback2(fs)
{
  var image = document.getElementById('myImage5');
image.src = "newPersistentFile.txt";
  console.log('file system open: ' + fs.name);
  fs.root.getFile("newPersistentFile.jpg", fileSystemOptionals, getFileCallback2, onError);
}

function getFileCallback2(entry){
  var image = document.getElementById('myImage5');
  image.src = "newPersistentFile.jpg";
}
 

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);

function onError(msg){
  console.log(msg);
}
