const FormData = require('form-data');
//const request = require('request');
var request = require('request-promise');



const https = require('https');
const http = require('http');
var JSZip = require("jszip");

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
   



   var zip = new JSZip();


    // create a file
zip.file("hello.txt", "Hello[p my)6cxsw2q");
// oops, cat on keyboard. Fixing !
zip.file("hello.txt", "Hello World\n");


async function test(content){


    var options = {
      uri : 'https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex/uploadType/files?returnType=reportURL',
      method : 'POST',
      json: true,// Automatically stringifies the body to JSON
      headers: {
        "Content-Type": "multipart/form-data"
      },
      formData:{
        "file":{
          value:content,
          options: {
            filename:'gitFiles.zip',
            contentType: 'application/zip'
          }
         }
    }
  };
  
  console.log('gng 2 send request');
  
  await request(options)
      .then(function (response) {
          console.log('response===');
          console.log(response);
              // Set a response type of plain text for the response
        res.writeHead(200, {'Content-Type': 'text/plain'});
  
        // Send back a response and end the connection
      //  res.end(content);
      res.end('hello');
      })
      .catch(function (err) {
          console.log('err===');
          console.log(err);
      });

    }
zip.generateAsync({type:"nodebuffer"})
.then(function (content) {
    // see FileSaver.js
    //saveAs(content, "hello.zip");
   
    try {
    test(content);
        } catch (e) {
            console.log('e===');
          console.log(e); 
}
   

/*
var req=request(options, function(err, response, body) {

  console.log('request sent');

  var reason;
  if (err) {
      reason = {
          cause: err,
          error: err,
          options: options,
          response: response
      };
} else if (!(/^2/.test('' + response.statusCode))) { // Status Codes other than 2xx
      reason = {
          statusCode: response.statusCode,
          error: body,
          options: options,
          response: response
      };
  }

  console.log("reason");

  console.log(reason);

 // console.log('response==');
 // console.log(response);

  console.log('body==');
  console.log(body);

      // Set a response type of plain text for the response
      res.writeHead(200, {'Content-Type': 'text/plain'});

      // Send back a response and end the connection
    //  res.end(content);
    res.end('hello');
      

});
  */
});



});

// Start the server on port 8000
app.listen(8000, '127.0.0.1');
console.log('Node server running on port 8000');
