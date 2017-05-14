'use strict';
const { getGitTrend, getReadme } = require('./app/github');
const { getCoinsPriceByMarket, getCoinPrice } = require('./app/coins');

const githubTrend = (event, context, callback) => {
  getGitTrend(event.query, callback);
};

const githubReadme = (event, context, callback) => {
  const { user, repoName } = event.path;
  getReadme(user, repoName, callback);
};

const coinsPriceByMarket = (event, context, callback) => {
  const { market } = event.path;
  getCoinsPriceByMarket(market, callback);
};

const coinPrice = (event, context, callback) => {
  const { coin } = event.path;
  getCoinPrice(coin, callback);
};

module.exports = {
  githubTrend,
  githubReadme,
  coinsPriceByMarket,
  coinPrice
};
