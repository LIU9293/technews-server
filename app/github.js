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
    .then(json => {
      const Base64Content = json.content;
      const MarkdownString = Buffer.from(Base64Content, 'base64').toString('utf8');
      //const filePath = `https://raw.githubusercontent.com/${user}/${repoName}/master`;
      //MarkdownString = MarkdownString.replace(/<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi, `<img$1 src=$2${filePath}/$3$2`);
      callback(null, {
        success: true,
        data: Object.assign({}, json, {
          markdown: MarkdownString
        })
      });
    })
    .catch(err => callback(null, {
      success: false,
      message: err.toString()
    }));
}

module.exports = {
  getGitTrend,
  getReadme
};
