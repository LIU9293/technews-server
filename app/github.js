'use strict';
const querystring = require('querystring');
const fetch = require("node-fetch");

function getGitTrend(query, callback){
  const queryStr = querystring.stringify(query);
  fetch('http://trending.codehub-app.com/v2/trending?' + queryStr)
    .then(res => res.json())
    .then(json => callback(null, {
      success: true,
      data: json
    }))
    .catch(err => callback(null, {
      success: false,
      message: err.toString()
    }));
}

function getReadme(user, repoName, callback){
  const url = `https://api.github.com/repos/${user}/${repoName}/readme`;
  fetch(url)
    .then(res => res.json())
    .then(json => callback(null, {
      success: true,
      data: json
    }))
    .catch(err => callback(null, {
      success: false,
      message: err.toString()
    }));
}

module.exports = {
  getGitTrend,
  getReadme
};
