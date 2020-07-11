const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");
const FormData = require('form-data');
const btoa = require('btoa');
const Blob = require('blob');
const request = require('request');
//var request = require('request-promise');

var JSZip = require("jszip");

// .github/actions/my-script.js
const octokit = new Octokit();
var zip = new JSZip();

// `octokit` is now authenticated using GITHUB_TOKEN


//@param branch = heads/kamalsomu/featureB
async function createBranch(owner,repo,branch,sha,successCallback) {

    
  octokit.request("POST /repos/:owner/:repo/git/refs?ref="+branch+"&sha="+sha, {
    "owner":owner,
    "repo":repo
  }).then((response) => {

    console.log('createBranch response');
    console.log(response);
    successCallback(response);

  }).catch((err) => {
    console.log('createBranch error '+err);
    console.log('createBranch error json'+JSON.stringify(err));
 
  });
 
}

//@param branch = heads/kamalsomu/featureA
async function getBranchDetails(owner,repo,branch,successCallback) {

console.log('owner is==');
console.log(owner);

  await octokit.request("GET /repos/:owner/:repo/git/"+branch, {
    "owner":owner,
    "repo":repo
  }).then((response) => {

console.log('getBranchDetails response');
console.log(response);
successCallback(response);

   

}).catch((err) => {
   console.log('getBranchDetails error '+err);
   console.log('getBranchDetails error json'+JSON.stringify(err));

 });

}

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
  console.log('owner=='+owner);
  console.log('repo=='+repo);

  const currentPayloadRef=payloadJSON.ref;

  console.log('currentPayloadRef=='+currentPayloadRef);

  
  
  getBranchDetails(owner,repo,currentPayloadRef,function(response){
    var sha=response.data.object.sha;

  //var ref=response.ref;
    createBranch(owner,repo,"heads/kamalbranch1",sha,function(response){
      console.log('success');
    });

  });





} catch (error) {
  core.setFailed(error.message);
}