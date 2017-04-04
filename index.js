'use strict';
const { getGitTrend, getReadme } = require('./app/github');

const githubTrend = (event, context, callback) => {
  getGitTrend(event.query, callback);
};

const githubReadme = (event, context, callback) => {
  const { user, repoName } = event.path;
  getReadme(user, repoName, callback);
}

module.exports = {
  githubTrend,
  githubReadme
};
