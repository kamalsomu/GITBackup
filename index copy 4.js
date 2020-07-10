const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");
const FormData = require('form-data');
const btoa = require('btoa');
const Blob = require('blob');
//const request = require('request');
var request = require('request-promise');

var JSZip = require("jszip");

// .github/actions/my-script.js
const octokit = new Octokit();
var zip = new JSZip();

// `octokit` is now authenticated using GITHUB_TOKEN

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payloadJSON=github.context.payload;
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  

  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  /*
  var formData = new FormData(); 

  var url="https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex";

  var kaleidoscopeReq = request.post(url, function (err, httpResponse, body) {
    console.log('err=='+err);
    console.log('httpResponse=='+httpResponse);
    console.log('body=='+body);
});

var kaleidoscopeReqForm = kaleidoscopeReq.form();

*/

var cFormData=new FormData();




function test(content){

}
/*
function scanCode(){

  zip.generateAsync({type:"nodebuffer"})
.then(function (content) {



  var options = {
    uri : 'https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex/uploadType/files?returnType=reportId',
    method : 'POST',
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


  
  var issueLinkToPost="";
  console.log("typeof(response.response)");
  console.log(typeof(response.response));
  if(response.type=="SUCCESS" && response.response!=0){
    issueLinkToPost="https://kaleidoscopesf.herokuapp.com/pages/codequalityreport?reportId="+response.response;
  }

console.log("issueLinkToPost=="+issueLinkToPost);
  if(issueLinkToPost!=""){

    octokit.request("POST /repos/:owner/:repo/issues", {
      owner,
      repo,
      title: "Kaleidoscope - Code Quality issue(s) found.",
      body: "Click on the following URL to know more. "+issueLinkToPost
    });
    
  }else{
    console.log("no issues found...");
  }



});


});




}
*/

/*
   function getCommittedFiles(owner,repo,committedFiles){


    console.log(committedFiles[i]);
    for( var i=0;i<committedFiles.length;i++){

      var fileSha=committedFiles[i]["sha"];
var committedFileName=committedFiles[i]["filename"];
        octokit.git.getBlob({
          owner: owner,
          repo: repo,
          file_sha: fileSha
        }).then((committedFile) => {
          console.log('committedFile===='+committedFile);
          console.log('json committedFile===='+JSON.stringify(committedFile));
      
         console.log('committedFile.data.content==='+committedFile.data.content);
       
         var base64Str=committedFile.data.content;
         var decodedFile = new Buffer(base64Str, 'base64');

         cFormData.append(
           "file",{
            value:decodedFile,
            options: {
              filename:committedFileName,
              contentType: 'application/octet-stream'
            }
          }
         );
       

        
      // kaleidoscopeReqForm.append('file', decodedFile);


       }).catch((err) => {
         console.log('===========')
          console.log('error ');
          console.log('error json');
          console.log(err);
          console.log(JSON.stringify(err));
          console.log('===========')

        });


      }

      console.log('cFormData==');
      console.log(cFormData);
      
      scanCode(cFormData);

      


    }

*/


async function getCommittedFile(owner,repo,committedFileName,committedFileSha) {

await octokit.git.getBlob({
    owner: owner,
    repo: repo,
    file_sha: committedFileSha
  }).then((committedFile) => {

    var base64Str=committedFile.data.content;
  //  var decodedFile = new Buffer(base64Str, 'base64');

    var decodedFile=Buffer.from(base64Str, 'base64').toString('ascii')

    console.log('decodedFile start===');
    console.log(committedFileName);
    console.log(decodedFile);
    console.log('decodedFile end===');

    zip.file(committedFileName,decodedFile);


    /*
    cFormData.append(
      "file",{
       value:decodedFile,
       options: {
         filename:committedFileName,
         contentType: 'application/octet-stream'
       }
     }
    );
*/

 }).catch((err) => {
    console.log('getCommittedFile error '+err);
    console.log('getCommittedFile error json'+JSON.stringify(err));

  });

}

  async function getPullRequestFiles() {

 const pull_number = payloadJSON.number;

  await octokit
  .paginate('GET /repos/:owner/:repo/pulls/:pull_number/files', {
    owner: owner,
    repo: repo,
    pull_number:pull_number
  })
  .then((committedFiles) => {
    console.log('committedFiles===='+committedFiles);
    console.log('json committedFiles===='+JSON.stringify(committedFiles));

    for(var i=0;i<committedFiles.length;i++){
      var fileSha=committedFiles[i]["sha"];
      var committedFileName=committedFiles[i]["filename"];
      console.log("fileSha=="+fileSha);
      console.log("committedFileName=="+committedFileName);

      getCommittedFile(owner,repo,committedFileName,fileSha);
    }

    scanCode();


  }).catch((err) => {
    console.log('getPullRequestFiles error '+err);
    console.log('getPullRequestFiles error json'+JSON.stringify(err));

  });
  }

  getPullRequestFiles();


  function test(){
    var base64Str="b246IFtwdWxsX3JlcXVlc3RdCgpqb2JzOgogIGhlbGxvX3dvcmxkX2pvYjoK\nICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3QKICAgIG5hbWU6IENvZGUgU2Nh\nbm5lcgogICAgc3RlcHM6CiAgICAtIG5hbWU6IEhlbGxvIHdvcmxkIGFjdGlv\nbiBzdGVwCiAgICAgIGlkOiBoZWxsbwogICAgICB1c2VzOiBrYW1hbHNvbXUv\nS29kZVNjYW5AdjQwCiAgICAgIHdpdGg6CiAgICAgICAgd2hvLXRvLWdyZWV0\nOiAnTW9uYSB0aGUgT2N0b2NhdCcKICAgICAgICBHSVRIVUJfVE9LRU46ICR7\neyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fQogICAgIyBVc2UgdGhlIG91dHB1\ndCBmcm9tIHRoZSBgaGVsbG9gIHN0ZXAKICAgIC0gbmFtZTogR2V0IHRoZSBv\ndXRwdXQgdGltZQogICAgICBydW46IGVjaG8gIlRoZSB0aW1lIHdhcyAke3sg\nc3RlcHMuaGVsbG8ub3V0cHV0cy50aW1lIH19Igo=\n";
    var decodedFile = new Buffer(base64Str, 'base64');

    kaleidoscopeReqForm.append('file', decodedFile);

  }


} catch (error) {
  core.setFailed(error.message);
}