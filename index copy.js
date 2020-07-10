const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");
const FormData = require('form-data');
const btoa = require('btoa');
const Blob = require('blob');
const request = require('request');

// .github/actions/my-script.js
const octokit = new Octokit();

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

  var formData = new FormData(); 

  var url="https://kaleidoscopesf.herokuapp.com/api/kodescanner/scanCode/apex";

  var kaleidoscopeReq = request.post(url, function (err, httpResponse, body) {
    console.log('err=='+err);
    console.log('httpResponse=='+httpResponse);
    console.log('body=='+body);

/*   if (err) {
        cb(err);
    }
    cb(null, body);*/
});

var kaleidoscopeReqForm = kaleidoscopeReq.form();


   function getCommittedFiles(owner,repo,committedFiles){


    for( var i=0;i<committedFiles.length;i++){

      var fileSha=committedFiles[i]["sha"];

        octokit.git.getBlob({
          owner: owner,
          repo: repo,
          file_sha: fileSha
        }).then((committedFile) => {
          console.log('committedFile===='+committedFile);
          console.log('json committedFile===='+JSON.stringify(committedFile));
      
         // getCommittedFiles(committedFiles);
         console.log('committedFile.data.content==='+committedFile.data.content);
       
         var base64Str=committedFile.data.content;
         var decodedFile = new Buffer(base64Str, 'base64');

       // var buf = Buffer.from(base64Str, 'base64'); // Ta-da
        
       kaleidoscopeReqForm.append('file', decodedFile);


       /*  var fileContent=btoa(committedFile.data.content);
         console.log('fileContent=='+fileContent);
         var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
         formData.append("blob", blob, committedFiles[i]["filename"]);
*/

      
          // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
          // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
        }).catch((err) => {
          console.log('error '+err);
          console.log('error json'+JSON.stringify(err));
      
        });


      }

      console.log('formData=='+formData);

    


/*
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log('responseText==='+req.responseText);
          }
      }

      req.open("POST", url, true);
      req.setRequestHeader('enctype', 'multipart/form-data');

      req.send(formData);

*/

    }
      /* 

      request({
        url: committedFiles[i]["contents_url"],
        method: 'GET', 
      }, function(err, res, body) {

        var content = res.data.content;

        console.log('res=='+res);

       console.log('err===='+err);

        console.log('res===='+res);
        console.log('body===='+body);

        console.log('json err===='+JSON.stringify(err));
        console.log('json res===='+JSON.stringify(res));
        console.log('json body===='+JSON.stringify(body));*/

     // });


 /*     const requestOptions = octokit.repos.getContents.endpoint({
        owner: owner,
        repo: repo,
        path: committedFiles[i]["blob_url"],
        mediaType: {
          format: "raw"
        }
      }).then((committedFile) => {
        console.log('committedFile===='+committedFile);
        console.log('json committedFile===='+JSON.stringify(committedFile));
    
       // getCommittedFiles(committedFiles);
    
    
        // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
        // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
      }).catch((err) => {
        console.log('error '+err);
        console.log('error json'+JSON.stringify(err));
    
      });


/*    
      await octokit
      .paginate('GET  /repos/:owner/:repo/contents/:path', {
        owner: owner,
        repo: repo,
        path:committedFiles[i]["blob_url"]
      })
      .then((committedFile) => {
        console.log('committedFile===='+committedFile);
        console.log('json committedFile===='+JSON.stringify(committedFile));
    
       // getCommittedFiles(committedFiles);
    
    
        // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
        // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
      }).catch((err) => {
        console.log('error '+err);
        console.log('error json'+JSON.stringify(err));
    
      });



      await octokit
      .paginate('GET /repos/:owner/:repo/git/blobs/:file_sha', {
        owner: owner,
        repo: repo,
        file_sha:committedFiles[i]["sha"]
      })
      .then((committedFile) => {
        console.log('committedFile===='+committedFile);
        console.log('json committedFile===='+JSON.stringify(committedFile));
    
       // getCommittedFiles(committedFiles);
    
    
        // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
        // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
      }).catch((err) => {
        console.log('error '+err);
        console.log('error json'+JSON.stringify(err));
    
      });
*/


  async function start() {

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

    getCommittedFiles(owner,repo,committedFiles);


    // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
    // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
  }).catch((err) => {
    console.log('error '+err);
    console.log('error json'+JSON.stringify(err));

  });
  }

  start();

/*
  const commitURL = github.context.payload.pull_request.commits_url;

	 //  commits = await gh.paginate('GET ${url}', args);

     //method:

     const octokit = new Octokit();
     const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
          
     async function getCommittedFiles(){
      const commitURL = github.context.payload.pull_request.commits_url;
    console.log('commitURL==='+commitURL);

          await octokit
          .paginate('GET '+commitURL, {
            owner: owner,
            repo: repo
          })
          .then((data) => {
            console.log('data===='+data);
            console.log('json data===='+JSON.stringify(data));

            // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
            // like results from `octokit.request()` or any of the endpoint methods such as `octokit.issues.listForRepo()`
          }).catch((err) => {
            console.log('error '+err);
            console.log('error json'+JSON.stringify(err));

          });


          }
     
          getCommittedFiles();



  //const token = JSON.stringify(github.context.token, undefined, 2)
  //console.log(`The event token: ${token}`);

 /* const token = core.getInput('GITHUB_TOKEN');
  console.log('github-token =='+token);

  const env = core.getInput('env');
  console.log('github env =='+env);
  

  const kamal='${process.env.GITHUB_TOKEN}'

console.log('kamal=='+kamal);

const somu='${process.env.somu}'

console.log('somu=='+somu);

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");


/*const { data } = await octokit.request("POST /repos/:owner/:repo/issues", {
  owner,
  repo,
  title: "My test issue",
});
console.log("Issue created: %d", data.html_url);

console.log("owner is "+owner);

console.log("repo is "+repo);
/*
const { data } = await octokit.request("GET /repos/:owner/:repo/pulls/:pull_number/files", {
  owner,
  repo,
  pull_number:4
});

console.log(JSON.stringify(data));

console.log("blob_url : %d", data.blob_url);

console.log("contents_url : %d", data.contents_url);


octokit.pulls.get({
  owner: owner,
  repo: repo,
  pull_number: 4,
  mediaType: {
    format: "diff",
  },
}).then(({ data, headers, status }) => {
  console.log('KAMALSOMU A--'+data);
});



octokit.pulls.get({
  owner: owner,
  repo: repo,
  pull_number: 4
}).then(({ data, headers, status }) => {
  console.log('KAMALSOMU--'+JSON.stringify(data));
});

*/





} catch (error) {
  core.setFailed(error.message);
}