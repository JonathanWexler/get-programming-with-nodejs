'use strict';

const httpStatus = require('http-status-codes'),
  contentTypes = require('./content-types'),
  utils = require('./utils');

let routes = {
  'GET': {},
  'POST': {}
};

exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('views/error.html', res);
  }
};

exports.get = (url, action) => {
  routes['GET'][url] = action;
};

exports.post = (url, action) => {
  routes['POST'][url] = action;
};