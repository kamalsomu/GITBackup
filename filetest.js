const FormData = require('form-data');
//const request = require('request');
var request = require('request-promise');



const https = require('https');
const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
   
/*
try {

  var formData = new FormData(); 
   

  var url="https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex";

  var kaleidoscopeReq = request.post(url, function (err, httpResponse, body) {
    console.log('err=='+err);
    console.log('httpResponse=='+httpResponse);
    console.log('body=='+body);
});

var kaleidoscopeReqForm = kaleidoscopeReq.form();
*/

/*
  function test(){
   /* var base64Str="b246IFtwdWxsX3JlcXVlc3RdCgpqb2JzOgogIGhlbGxvX3dvcmxkX2pvYjoK\nICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3QKICAgIG5hbWU6IENvZGUgU2Nh\nbm5lcgogICAgc3RlcHM6CiAgICAtIG5hbWU6IEhlbGxvIHdvcmxkIGFjdGlv\nbiBzdGVwCiAgICAgIGlkOiBoZWxsbwogICAgICB1c2VzOiBrYW1hbHNvbXUv\nS29kZVNjYW5AdjQwCiAgICAgIHdpdGg6CiAgICAgICAgd2hvLXRvLWdyZWV0\nOiAnTW9uYSB0aGUgT2N0b2NhdCcKICAgICAgICBHSVRIVUJfVE9LRU46ICR7\neyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fQogICAgIyBVc2UgdGhlIG91dHB1\ndCBmcm9tIHRoZSBgaGVsbG9gIHN0ZXAKICAgIC0gbmFtZTogR2V0IHRoZSBv\ndXRwdXQgdGltZQogICAgICBydW46IGVjaG8gIlRoZSB0aW1lIHdhcyAke3sg\nc3RlcHMuaGVsbG8ub3V0cHV0cy50aW1lIH19Igo=\n";
    var decodedFile = new Buffer(base64Str, 'base64');

    kaleidoscopeReqForm.append('file', decodedFile);
*/
/*
var form = new FormData(); 

var base64Str="b246IFtwdWxsX3JlcXVlc3RdCgpqb2JzOgogIGhlbGxvX3dvcmxkX2pvYjoK\nICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3QKICAgIG5hbWU6IENvZGUgU2Nh\nbm5lcgogICAgc3RlcHM6CiAgICAtIG5hbWU6IEhlbGxvIHdvcmxkIGFjdGlv\nbiBzdGVwCiAgICAgIGlkOiBoZWxsbwogICAgICB1c2VzOiBrYW1hbHNvbXUv\nS29kZVNjYW5AdjQwCiAgICAgIHdpdGg6CiAgICAgICAgd2hvLXRvLWdyZWV0\nOiAnTW9uYSB0aGUgT2N0b2NhdCcKICAgICAgICBHSVRIVUJfVE9LRU46ICR7\neyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fQogICAgIyBVc2UgdGhlIG91dHB1\ndCBmcm9tIHRoZSBgaGVsbG9gIHN0ZXAKICAgIC0gbmFtZTogR2V0IHRoZSBv\ndXRwdXQgdGltZQogICAgICBydW46IGVjaG8gIlRoZSB0aW1lIHdhcyAke3sg\nc3RlcHMuaGVsbG8ub3V0cHV0cy50aW1lIH19Igo=\n";
var decodedFile = new Buffer(base64Str, 'base64');
form.append('file', decodedFile);
var url="https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex";

var request = http.request({
  method: 'post',
  host: 'https://kaleidoscopesf.herokuapp.com',
  path: "/api/kodescanner/scanCode/apex",
  headers: form.getHeaders()
});
 
form.pipe(request);
 
request.on('response', function(res) {

    console.log('res=='+res);

  //console.log('res type=='+res.type);
  //console.log('res response=='+res.response);

  //console.log('json string=='+JSON.stringify(res));
 // console.log('statusCode=='+res.statusCode);
});

request.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


     // Set a response type of plain text for the response
     res.writeHead(200, {'Content-Type': 'text/plain'});

     // Send back a response and end the connection
     res.end('Hello World!\n');
 
  }
  */

 function test() {

  var form = new FormData();

  //var base64Str="b246IFtwdWxsX3JlcXVlc3RdCgpqb2JzOgogIGhlbGxvX3dvcmxkX2pvYjoK\nICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3QKICAgIG5hbWU6IENvZGUgU2Nh\nbm5lcgogICAgc3RlcHM6CiAgICAtIG5hbWU6IEhlbGxvIHdvcmxkIGFjdGlv\nbiBzdGVwCiAgICAgIGlkOiBoZWxsbwogICAgICB1c2VzOiBrYW1hbHNvbXUv\nS29kZVNjYW5AdjQwCiAgICAgIHdpdGg6CiAgICAgICAgd2hvLXRvLWdyZWV0\nOiAnTW9uYSB0aGUgT2N0b2NhdCcKICAgICAgICBHSVRIVUJfVE9LRU46ICR7\neyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fQogICAgIyBVc2UgdGhlIG91dHB1\ndCBmcm9tIHRoZSBgaGVsbG9gIHN0ZXAKICAgIC0gbmFtZTogR2V0IHRoZSBv\ndXRwdXQgdGltZQogICAgICBydW46IGVjaG8gIlRoZSB0aW1lIHdhcyAke3sg\nc3RlcHMuaGVsbG8ub3V0cHV0cy50aW1lIH19Igo=\n";
  
  var base64Str='QGlzVGVzdApwdWJsaWMgY2xhc3MgRm9vIHsKICAgIHB1YmxpYyBzdGF0aWMgdGVzdE1ldGhvZCB2b2lkIHRlc3RTb21ldGhpbmcoKSB7CiAgICAgICAgQWNjb3VudCBhID0gbnVsbDsKICAgICAgICAvLyBUaGlzIGlzIGJldHRlciB0aGFuIGhhdmluZyBhIE51bGxQb2ludGVyRXhjZXB0aW9uCiAgICAgICAgLy8gU3lzdGVtLmFzc2VydE5vdEVxdWFscyhhLCBudWxsLCAnYWNjb3VudCBub3QgZm91bmQnKTsKICAgICAgICBhLnRvU3RyaW5nKCk7CiAgICB9Cn0=';
  var decodedFile = new Buffer(base64Str, 'base64');
  form.append('file', decodedFile);

  var options = {
    uri : 'https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex/uploadType/files',
    method : 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData:{file:{
      value:decodedFile,
      options: {
        filename: 'Foo.cls',
        contentType: 'application/octet-stream'
      }
    }}
};

 /* var options = {
      host : 'https://kaleidoscopesf.herokuapp.com',
      method : 'POST',
      rejectUnauthorized: false,
      path:'/api/kodescanner/scanCode/apex'
  };*/
 var req=request(options, function(err, response, body) {


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

    console.log(reason);

    console.log('response==');
    console.log(response);

    console.log('body==');
    console.log(body);

      /*var buffer = "";
      res.on('data', function(chunk) {
          buffer += chunk;
      });
      res.on('end', function(chunk) {
        console.log('buffer.toString()=='+buffer.toString());
         // var json = JSON.parse(buffer.toString());
         // console.log(json);
      });
*/
   

  });

 
  //form.append('file', fs.createReadStream(filepath));
  //form.append('project_id', 4);
  //form.pipe(req);

 /* req.on('error', function(e) {
      console.log('problem with request:', e.message);
  });

  req.on('response', function(res) {
    console.log(res.statusCode);
    //console.log(res);

  });*/

    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');

}

test();




});

// Start the server on port 8000
app.listen(8000, '127.0.0.1');
console.log('Node server running on port 8000');
