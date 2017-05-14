'use strict';
const querystring = require('querystring');
const fetch = require("node-fetch");
const coinNames = require('./lib/coinName');

function getCoinsPriceByMarket(market, callback){
  switch (market) {
    case 'poloniex':
      getPoloniexPrice(callback);
      return;
    case 'shapeshift':
      getShapeShiftPrice(callback);
      return;
    default:
      callback(null, {
        success: false,
        message: 'the market provided is not found'
      });
  }
}

function getCoinPrice(coin, callback){
  callback(null, {
    success: false,
    message: 'test'
  });
}

const getPoloniexPrice = (callback) => {
  fetch('https://poloniex.com/public?command=returnTicker')
    .then(res => res.json())
    .then(data => {
      let usdData = Object.keys(data).filter(item => item.substr(0, 4) === "USDT");
      return Promise.resolve(usdData.map(item => ({
        originalData: data[item],
        name: coinNames[item.split("_")[1]] ? coinNames[item.split("_")[1]].toLocaleLowerCase() : item.split("_")[1],
        shortName: item.split("_")[1],
        priceUSD: parseFloat(data[item].last)
      })));
    })
    .then(dataArray => callback(null, {
      success: true,
      data: dataArray
    }))
    .catch(err => callback(null, {
      success: false,
      message: 'server error when get poloniex data :' + err.toString()
    }));
};

const getShapeShiftPrice = (callback) => {
  fetch('https://coincap.io/sscoins')
    .then(res => res.json())
    .then(data => Promise.resolve(
      data.map(item => ({
        originalData: Object.assign({}, item),
        name: item.long.toLocaleLowerCase(),
        shortName: item.short.toLocaleUpperCase(),
        priceUSD: parseFloat(item.price)
      })).slice(0, 20)
    ))
    .then(dataArray => callback(null, {
      success: true,
      data: dataArray
    }))
    .catch(err => callback(null, {
      success: false,
      message: 'server error when get poloniex data :' + err.toString()
    }));
};

module.exports = {
  getCoinsPriceByMarket,
  getCoinPrice
};